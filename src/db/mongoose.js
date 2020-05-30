const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task = new Task({
    description: 'Complete the project',
    completed: true
});

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
});
