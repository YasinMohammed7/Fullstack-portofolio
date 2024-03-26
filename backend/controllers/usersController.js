const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

// @desc get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            roles: true,
            message: {
                select: {
                    content: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    })
    if (!users?.length) {
        return res.status(400).json({
            message: "No users found"
        })
    }
    res.json(users)
})

// @desc create a user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const duplicate = await prisma.user.findUnique({
        where: { username }
    })

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    // hash password

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {
        username: username,
        password: hashedPwd,
        roles: {
            set: roles
        }
    }

    const user = await prisma.user.create({
        data: userObject
    })

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: "Invalid user data received" })
    }
})

// @desc update a user 
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, password } = req.body

    if (!id || !username || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await prisma.user.findUnique({
        where: { id: +id }
    })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const duplicate = await prisma.user.findFirst({
        where: {
            username,
            NOT: {
                id: +id
            }
        }
    });

    // Allow updates to the original user 
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    const updateData = {
        username,
        roles: {
            set: roles
        },
    };

    if (password) {
        const hashedPwd = await bcrypt.hash(password, 10);
        updateData.password = hashedPwd;
    }

    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: updateData
    })


    // const accessToken = jwt.sign(
    //     {
    //         "UserInfo": {
    //             "username": updatedUser.username,
    //             "roles": updatedUser.roles
    //         }
    //     },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: "15m" }
    // )

    // const refreshToken = jwt.sign(
    //     { "username": updatedUser.username },
    //     process.env.REFRESH_TOKEN_SECRET,
    //     { expiresIn: "7d" }
    // )

    // res.cookie("jwt", refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None",
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // })


    res.json({ message: `${updatedUser.username} updated` })
})

// @desc delete a users
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: "User ID Required" })
    }

    const message = await prisma.message.findFirst({
        where: { userId: +id }
    });

    if (message) {
        return res.status(400).json({ message: 'User has assigned messages' });
    }

    const user = await prisma.user.findUnique({
        where: { id: +id }
    })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const result = await prisma.user.delete({
        where: { id: +id }
    })

    const reply = `Username ${result.username} with ID ${result.id} deleted`
    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}