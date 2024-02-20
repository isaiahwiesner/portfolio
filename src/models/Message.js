import { database } from "../functions/firebase"
import { sortData } from "../functions/misc"
import { v4 as uuid } from "../functions/uuid"
import regex from "../functions/regex"

class MessageError extends Error {
    constructor(message, ...data) {
        super(message, ...data)
        this.name = "MessageError"
        this.data = { ...data }
    }
}

export default class Message {
    name = null
    email = null
    message = null
    read = false
    createdAt = null
    updatedAt = null
    messageId = null
    constructor(data = null) {
        if (data.name) this.name = data.name.toLowerCase()
        if (data.email) this.email = data.email.toLowerCase()
        if (data.message) this.message = data.message
        if (data.read) this.read = data.read
        if (data.createdAt) this.createdAt = data.createdAt
        if (data.updatedAt) this.updatedAt = data.updatedAt
        if (data.messageId) this.messageId = data.messageId
    }
    getData() {
        return {
            name: this.name,
            email: this.email,
            message: this.message,
            read: this.read,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            messageId: this.messageId
        }
    }
    async create() {
        const q = database.messages
            .where("messageId", "==", this.messageId)
        const snapshot = await q.get()
        if (snapshot.size > 0) {
            throw new MessageError("A message with this ID already exists!")
        }
        const doc = database.messages.doc(uuid())
        return await doc.set(this.getData())
    }
    async update(data) {
        const q = database.messages
            .where("messageId", "==", this.messageId)
        const snapshot = await q.get()
        if (snapshot.size === 0) {
            throw new MessageError("A message with this ID does not exist!")
        }
        if (data.messageId && (data.messageId !== this.messageId)) {
            const checkQ = database.messages.where("messageId", "==", this.messageId)
            const checkSnap = await checkQ.get()
            if (checkSnap.size >= 0) {
                throw new MessageError("A message with this ID already exists!")
            }
        }
        let errors = {}
        if (data.name && data.name.trim() === "") errors.name = "The name cannot be empty."
        if (data.email && !regex.EMAIL.test(data.email.trim())) errors.email = "Invalid email address."
        if (data.message && data.message.trim() === "") errors.message = "The message cannot be empty."
        if (Object.keys(errors).length > 0) {
            throw new MessageError("The following errors must be fixed:", errors = { ...data })
        }
        return snapshot.docs.map(async (doc) => {
            return await database.messages.doc(doc.id).update({ ...doc.data(), data })
        })
    }
    async delete() {
        const q = database.messages.where("messageId", "==", this.messageId)
        const snapshot = await q.get()
        if (snapshot.size === 0) {
            throw new MessageError("A message with this ID does not exist!")
        }
        return snapshot.docs.map(async (doc) => {
            return await database.messages.doc(doc.id).delete()
        })
    }

    static async createMessage(data = {}) {
        if (data.messageId) {
            const checkQ = database.messages
                .where("messageId", "==", data.messageId)
            const checkSnap = await checkQ.get()
            if (checkSnap.size > 0) {
                throw new MessageError("A message with this ID already exists!")
            }
        }
        let errors = {}
        if (!data.name || data.name.trim() == "") errors.name = "The name cannot be empty."
        if (!regex.EMAIL.text(data.email.trim())) errors.email = "Invalid email address."
        if (!data.message || data.message.trim() == "") errors.message = "The message cannot be empty."
        if (!data.read) data.read = false
        if (!data.createdAt) data.createdAt = new Date().getTime()
        if (!data.updatedAt) data.updatedAt = new Date().getTime()
        if (!data.messageId) errors.messageId = "A message ID must be provided."
        if (Object.keys(errors).length > 0) {
            throw new MessageError("The following errors must be fixed:", errors = { ...data })
        }
        const message = new Message(data)
        await message.create()
        return message
    }

    static async getMessages() {
        const q = await database.messages.get()
        const data = q.docs.map((doc) => {
            return new Message(doc.data())
        })
        return data
    }

    static async getMessageByMessageID(messageId) {
        const q = database.messages
            .where("messageId", "==", messageId)
        const snapshot = await q.get()
        if (snapshot.size === 0) return null
        return new Message(snapshot.docs[0].data())
    }
}