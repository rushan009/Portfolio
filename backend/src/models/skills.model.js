import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        enum:["Frontend", "Backend", "Languages", "Tools & Technologies", "Database", "Other"],
        default:"Other"
    }
})

const Skill = mongoose.model("Skill", SkillSchema)
export default Skill