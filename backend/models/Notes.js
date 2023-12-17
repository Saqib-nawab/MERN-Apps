const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this is used to so that we can identify to which user this notes belongs(becuase we will only notes respective to a specific user)
    },
    title:{
        type: 'string',
    },
    name:{
        type : 'string'
    },
    description:{
        type : 'string',
        required: true
    },
    tag:{
        type : 'string',
        default:'general'
    }
    
});

module.exports = mongoose.model('notes',notesSchema);