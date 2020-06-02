const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

//Creating tasks
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
});

//Fetching all tasks
router.get('/tasks', async (req, res) => {
    const task = await Task.find({});
    try {
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Fetch single task
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const tasks = await Task.findById(_id);
        if (!tasks) {
            return res.status(400).send()
        } else {
            res.status(200).send(tasks)
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

//Updating a task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Not a valid operation' })
    }

    try {
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

//Deleting task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(400).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;
