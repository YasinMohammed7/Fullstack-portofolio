const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")

// @desc get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {

})

// @desc create a user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {

})

// @desc update a user 
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {

})

// @desc delete a users
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}