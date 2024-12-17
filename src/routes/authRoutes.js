import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword);
    // save the new user and hashedPassword to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
        VALUES(?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        //add default todo for new user
        const defaultTodo = `Hello, :) this is your first gifted todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES(?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token to authenticate existed user
        const token =  jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);


    }
    res.sendStatus(201)

})

router.post('login', (req, res) => {

})


export default router