const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const login = asyncHandler(async (req, res) => {
})

const refresh = asyncHandler(async (req, res) => {
})

const logout = asyncHandler(async (req, res) => {

})

module.exports = { login, refresh, logout }