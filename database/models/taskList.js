const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    title: { type: String, trim: true, minLength: 3}
});

//now for any schema we need to define the model to use it
const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList;