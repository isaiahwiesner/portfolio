import { database } from "../functions/firebase"
import { sortData } from "../functions/misc"
import { v4 as uuid } from "../functions/uuid"
import regex from "../functions/regex"

class UserError extends Error {
    constructor(message, ...data) {
        super(message, ...data)
        this.name = "UserError"
        this.data = { ...data }
    }
}

export default class User {
    username = null
    email = null
    permission = 0
    createdAt = null
    updatedAt = null
    uid = null
    constructor(data = null) {
        if (data.username) this.username = data.username.toLowerCase()
        if (data.email) this.email = data.email.toLowerCase()
        if (data.permission) this.permission = data.permission
        if (data.createdAt) this.createdAt = data.createdAt
        if (data.updatedAt) this.updatedAt = data.updatedAt
        if (data.uid) this.uid = data.uid
    }
    getData() {
        return {
            username: this.username,
            email: this.email,
            permission: this.permission,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            uid: this.uid
        }
    }
    async create() {
        const q = database.users
            .where("uid", "==", this.uid)
        const snapshot = await q.get()
        if (snapshot.size > 0) {
            throw new UserError("A user with this ID already exists!")
        }
        const doc = database.users.doc(uuid())
        return await doc.set(this.getData())
    }
    async update(data) {
        const q = database.users
            .where("uid", "==", this.uid)
        const snapshot = await q.get()
        if (snapshot.size === 0) {
            throw new UserError("A user with this ID does not exist!")
        }
        if (data.uid && (data.uid !== this.uid)) {
            const checkQ = database.users.where("uid", "==", this.uid)
            const checkSnap = await checkQ.get()
            if (checkSnap.size >= 0) {
                throw new UserError("A user with this ID already exists!")
            }
        }
        if (data.username && (data.username.toLowerCase() !== this.username)) {
            const checkQ = database.users.where("username", "==", this.username)
            const checkSnap = await checkQ.get()
            if (checkSnap.size >= 0) {
                throw new UserError("A user with this username already exists!")
            }
        }
        if (data.email && (data.email.toLowerCase() !== this.email)) {
            const checkQ = database.users.where("email", "==", this.email)
            const checkSnap = await checkQ.get()
            if (checkSnap.size >= 0) {
                throw new UserError("A user with this email already exists!")
            }
        }
        let errors = {}
        if (!regex.USERNAME.test(data.username.trim())) errors.username = "The username can only contain letters, numbers, and underscores."
        else if (data.username && (data.username.trim().length < 3 || data.username.trim().length > 32)) errors.username = "The username must be between 3 and 32 characters."
        if (!regex.EMAIL.test(data.email.trim())) errors.email = "Invalid email address."
        if (Object.keys(errors).length > 0) {
            throw new UserError("The following errors must be fixed:", errors = { ...data })
        }
        return snapshot.docs.map(async (doc) => {
            return await database.users.doc(doc.id).update({ ...doc.data(), data })
        })
    }
    async delete() {
        const q = database.users.where("uid", "==", this.uid)
        const snapshot = await q.get()
        if (snapshot.size === 0) {
            throw new UserError("A user with this ID does not exist!")
        }
        return snapshot.docs.map(async (doc) => {
            return await database.users.doc(doc.id).delete()
        })
    }

    static async createUser(data = {}) {
        if (data.uid) {
            const checkQ = database.users
                .where("uid", "==", data.uid)
            const checkSnap = await checkQ.get()
            if (checkSnap.size > 0) {
                throw new UserError("A user with this ID already exists!")
            }
        }
        let errors = {}
        if (!data.username) errors.username = "A username must be provided."
        else if (!regex.USERNAME.test(data.username.trim())) errors.username = "The username can only contain letters, numbers, and underscores."
        else if (data.username.trim().length < 3 || data.username.trim().length > 32) errors.username = "The username must be between 3 and 32 characters."
        if (!data.email) errors.email = "An email address must be provided."
        else if (!regex.EMAIL.test(data.email.trim())) errors.email = "Invalid email address."
        if (!data.createdAt) data.createdAt = new Date().getTime()
        if (!data.updatedAt) data.updatedAt = new Date().getTime()
        if (!data.uid) errors.uid = "A user ID (UID) must be provided."
        if (Object.keys(errors).length > 0) {
            throw new UserError("The following errors must be fixed:", errors = { ...data })
        }
        const user = new User(data)
        await user.create()
        return user
    }

    static async getUsers() {
        const q = await database.users.get()
        const data = q.docs.map((doc) => {
            return new User(doc.data())
        })
        return data
    }

    static async getUserByUID(uid) {
        const q = database.users
            .where("uid", "==", uid)
        const snapshot = await q.get()
        if (snapshot.size === 0) return null
        return new User(snapshot.docs[0].data())
    }
}
