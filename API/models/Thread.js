const mongoose = require('mongoose');

const ThreadSchema = mongoose.Schema(
    {
        ThreadSubject:{
            type:String,
            require:true
        },
        ThreadCategory:{
            type:String,
            require:true
        },
        ThreadDetail:{    
            type:String,
            require:[true],
            default:"-",
        },
        ThreadComments:{
            type:JSON,
            require:true,
            default:{}
        },
        ThreadAuthor:{
            type:String,
            require:true
        },  

    },
    {
        timestamps:true
    }
)

const Threads = mongoose.model("Threads", ThreadSchema)

module.exports = Threads;