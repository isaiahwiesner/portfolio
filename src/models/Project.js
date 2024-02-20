import { database } from "../functions/firebase"
import { sortData } from "../functions/misc"
import { v4 as uuid } from "../functions/uuid"

class ProjectError extends Error {
    constructor(message, ...data) {
        super(message, ...data)
        this.name = "ProjectError"
        this.data = { ...data }
    }
}

export default class Project {
    name = null
    description = null
    releaseDate = null
    photos = []
    createdAt = null
    updatedAt = null
    projectId = null
    url = null
    constructor(data = null) {
        if (data.name) this.name = data.name
        if (data.description) this.description = data.description
        if (data.releaseDate) this.releaseDate = data.releaseDate
        if (data.photos) this.photos = data.photos
        if (data.createdAt) this.createdAt = data.createdAt
        if (data.updatedAt) this.updatedAt = data.updatedAt
        if (data.projectId) this.projectId = data.projectId
        if (this.name && this.projectId) this.url = `${this.projectId}-${this.name.toLowerCase().replaceAll(/[\s]/g, "-").replaceAll(/[^a-z0-9-_]/g, "_")}`
    }
    getData() {
        return {
            name: this.name,
            description: this.description,
            releaseDate: this.releaseDate,
            photos: this.photos,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            projectId: this.projectId,
        }
    }
    async create() {
        const q = database.projects
            .where("projectId", "==", this.projectId)
        const snapshot = await q.get()
        if (snapshot.size > 0) {
            throw new ProjectError("A project with this ID already exists!")
        }
        const doc = database.projects.doc(uuid())
        return await doc.set(this.getData())
    }
    async update(data) {
        const q = database.projects
            .where("projectId", "==", this.projectId)
        const snapshot = await q.get()
        if (snapshot.size === 0) {
            throw new ProjectError("A project with this ID does not exist!")
        }
        if (data.projectId && (data.projectId !== this.projectId)) {
            const checkQ = database.projects.where("projectId", "==", this.projectId)
            const checkSnap = await checkQ.get()
            if (checkSnap.size >= 0) {
                throw new ProjectError("A project with this ID already exists!")
            }
        }
        let errors = {}
        if (data.name && (data.name.trim().length < 3 || data.name.trim().length > 32)) errors.name = "The name must be between 3 and 32 characters."
        if (data.description && (data.description.trim().length < 16 || data.description.trim().length > 2500)) errors.description = "The description must be between 16 and 2,500 characters."
        if (Object.keys(errors).length > 0) {
            throw new ProjectError("The following errors must be fixed:", errors = { ...data })
        }
        this.url = `${this.projectId}-${this.name.toLowerCase().replaceAll(/[\s]/g, "-").replaceAll(/[^a-z0-9-_]/g, "_")}`
        return snapshot.docs.map(async (doc) => {
            return await database.projects.doc(doc.id).update({ ...doc.data(), data })
        })
    }
    async delete() {
        const q = database.projects.where("projectId", "==", this.projectId)
        const snapshot = await q.get()
        if (snapshot.size === 0) {
            throw new ProjectError("A project with this ID does not exist!")
        }
        return snapshot.docs.map(async (doc) => {
            return await database.projects.doc(doc.id).delete()
        })
    }

    static async createProject(data = {}) {
        if (data.projectId) {
            const checkQ = database.projects
                .where("projectId", "==", data.projectId)
            const checkSnap = await checkQ.get()
            if (checkSnap.size > 0) {
                throw new ProjectError("A project with this ID already exists!")
            }
        }
        let errors = {}
        if (!data.name) errors.name = "A name must be provided."
        else if (data.name.trim().length < 3 || data.name.trim().length > 32) errors.name = "The name must be between 3 and 32 characters."
        if (!data.description) errors.description = "A description must be provided."
        else if (data.description.trim().length < 16 || data.description.trim().length > 2500) errors.description = "The description must be between 16 and 2,500 characters."
        if (!data.createdAt) data.createdAt = new Date().getTime()
        if (!data.updatedAt) data.updatedAt = new Date().getTime()
        if (!data.projectId) data.projectId = await Project.getNextProjectId()
        if (Object.keys(errors).length > 0) {
            throw new ProjectError("The following errors must be fixed:", errors = { ...data })
        }
        const project = new Project(data)
        await project.create()
        return project
    }

    static async getNextProjectId() {
        const q = await database.projects.get()
        if (q.size === 0) return 1
        const data = q.docs.map((doc) => {
            return doc.data()
        })
        return sortData(data, "projectId")[0].id + 1
    }
    static async getProjects() {
        const q = await database.projects.get()
        const data = q.docs.map((doc) => {
            return new Project(doc.data())
        })
        return data
    }
    static async queryProjects(query, orderBy = "createdAt") {
        const q = await database.projects
            .where("name", ">=", query)
            .where("name", "<=", query + "~")
            .get()
        const data = q.docs.map((doc) => {
            return doc.data()
        })
        return sortData(data, orderBy.split(",")).map((data) => new Project(data))
    }

    static async getProjectById(projectId) {
        const q = database.projects
            .where("projectId", "==", projectId)
        const snapshot = await q.get()
        if (snapshot.size === 0) return null
        return new Project(snapshot.docs[0].data())
    }
}