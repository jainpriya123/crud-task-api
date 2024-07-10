const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, trim: true, minLength: 3},
    _tasklistId: { type: mongoose.Types.ObjectId, required: true},
    completed: {type: Boolean, default: false, required: true}
});

//now for any schema we need to define the model to use it
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;