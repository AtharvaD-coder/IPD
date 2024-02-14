import mongoose from "mongoose";

const NameSchema= new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    address:{
        type:String,

    }
})

export const Name = mongoose.models.Name || mongoose.model("Name", NameSchema);
