const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const asyncHandler = require("express-async-handler")

const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await prisma.message.findMany(
        {
            select: {
                id: true,
                content: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
            orderBy: {
                updatedAt: "desc"
            }
        }
    )


    if (!messages?.length) {
        return res.status(400).json({ message: "No messages found" })
    }

    res.json(messages)
})

const createNewMessage = asyncHandler(async (req, res) => {
    const { content, username } = req.body

    if (!content || !username) {
        res.status(400).json({ message: "All fields are required" })
    }

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const message = await prisma.message.findUnique({
        where: { userId: +user.id }
    })


    if (message) {
        return res.status(400).json({ message: "The user already send a message" })
    }

    const newMessage = await prisma.message.create({
        data: {
            content,
            userId: +user.id
        }
    })

    if (newMessage) {
        res.status(201).json({ message: "Message created" })
    } else {
        res.status(400).json({ message: "Invalid message data received" })
    }
})

const updateMessage = asyncHandler(async (req, res) => {
    const { id, content } = req.body

    if (!content || !id) {
        res.status(400).json({ message: "All fields are required" })
    }

    const message = await prisma.message.findUnique({
        where: { id: +id }
    })

    if (!message) {
        res.status(400).json({ message: "Message not found" })
    }

    const updatedMessage = await prisma.message.update({
        where: { id: +id },
        data: {
            content,
        },
    })

    res.json({ message: `Message updated` })
})

const deleteMessage = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        res.status(400).json({ message: "Message ID Required" })
    }

    const message = await prisma.message.findUnique({
        where: { id: +id }
    })

    if (!message) {
        res.status(400).json({ message: "Message not found" })
    }

    const result = await prisma.message.delete({
        where: { id: +id }
    })

    const reply = `Message deleted`

    res.json(reply)
})

module.exports = {
    getAllMessages,
    createNewMessage,
    updateMessage,
    deleteMessage
}
