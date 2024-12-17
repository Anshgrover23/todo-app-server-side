import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../prismaClient.js";

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword);
    // save the new user and hashedPassword to the db
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        //add default todo for new user
        const defaultTodo = `Hello, :) this is your first gifted todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token to authenticate existed user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);


    }

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        // check if user exist 
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }
        // matches the password
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        // check if password is valid or not
        if (!isPasswordValid) {
            return res.status(401).send({ message: "INVALID Password" })
        }

        console.log(user);
        // create a token to authenticate existed user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);

    }
})


export default router