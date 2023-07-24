const mongoose = require('mongoose');

const AlumniAccountSchema = mongoose.Schema(
    {
        FirstName:{
            type:String,
            required:[true, "Enter First Name"]
        },
        LastName:{
            type:String,
            //require:[true, "Enter Last Name"]
        },
        PhoneNumber:{
            type:String,
            //require:[true],
            default:"0",
        },
        Address:{
            type:String,
            default:"ที่อยู่ / ที่พักอาศัย"
        },
        StdID:{
            type:String,
            default:"0",
            //require:[true,"Enter Your Student ID"],
        },  
        Course:{
            type:String,
            default:"CS",
        },
        Qualification:{
            type:String,
            default:"วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์) วิทยาการคอมพิวเตอร์"
        },
        GraduateYear:{
            type:String,
            default:'0'
        },
        Permission:{
            type:String,
            //require:true,
            default:"student"
        },
        Email:{
            type:String,
            require:true,
        },
        Password:{
            type:String,
            require:true,
        }
    },
    {
        timestamps:true
    }
)

const AlumniAccount = mongoose.model("AlumniAccount", AlumniAccountSchema)

module.exports = AlumniAccount;