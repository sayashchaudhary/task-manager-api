const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Creating users
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
});

//Fetching all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Fetching single user
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).send()
        } else {
            res.send(user)
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

//Updating a user
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Not a valid operation' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
});

//Deleting users
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).send();
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Creating tasks
app.post('/tasks', async (req, res) => {
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
app.get('/tasks', async (req, res) => {
    const task = await Task.find({});
    try {
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Fetch single task
app.get('/tasks/:id', async (req, res) => {
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
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Not a valid operation' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

//Deleting task
app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log('Server is running on ' + port)
});
