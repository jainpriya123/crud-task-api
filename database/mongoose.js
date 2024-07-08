const mongoose = require('mongoose');

//this make the system asynchronos so that any longer query doesn't block other request from being done.
mongoose.Promise = global.Promise;

//link will get in cmd go to bin folder and type mongo
mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb')
        .then(()=>{
            console.log("DB Connected Successfully!")
        })
        .catch((error)=>{
            console.log(error)
        });

//export file to import into other files
module.exports = mongoose;