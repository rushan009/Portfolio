import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    github:{
        type:String,
        required:true
    },
    live:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    }
})

const Project = mongoose.model("Project", ProjectSchema)
export default Project