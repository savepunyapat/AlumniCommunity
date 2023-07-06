const mongoose = require('mongoose');

const AlumniAccountSchema = mongoose.Schema(
    {
        FirstName:{
            type:String,
            required:[true, "Enter First Name"]
        },
        PhoneNumber:{
            type:String,
            require:[true],
            default:"0",
        }
    },
    {
        timestamps:true
    }
)

const AlumniAccount = mongoose.model("AlumniAccount", AlumniAccountSchema)

module.exports = AlumniAccount;