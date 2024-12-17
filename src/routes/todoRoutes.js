import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// get all todos for logged-in user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos)
})

// create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body
    const todo = await prisma.todo.create({
        data: {
            userId: req.userId,
            task
        }
    })

    res.json(todo)

})

// update a todo
router.put('/:id', async (req, res) => {
    const { completed, task } = req.body;
    const { id } = req.params
    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            task,
            completed: !!completed
        }
    })

    res.json(updatedTodo)

})

//delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.todo.delete({
        where: {
        id: parseInt(id),
        userId: req.userId
    }})

    res.json({ message: "succesfully deleted" })
})

export default router