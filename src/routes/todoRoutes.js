import express from 'express'
import db from '../db.js'

const router = express.Router()

// get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id= ?`)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// create a new todo
router.post('/', (req, res) => {
    const {task} = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.json({id: result.lastInsertRowid, task, completed: 0})

})

// update a todo
router.put('/:id', (req, res) => {
    const { completed, task } = req.body;
    const { id } = req.params
    const updateTodo = db.prepare(`UPDATE todos SET task = ?, completed = ? WHERE id = ?`)
    updateTodo.run(task, completed, id)

    res.json({message: "todo updated"})

})

//delete a todo
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id= ? AND user_id = ?`)
    deleteTodo.run(id, req.userId)

    res.json({message: "succesfully deleted"})
})

export default router