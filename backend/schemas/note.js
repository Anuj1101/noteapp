const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const notesSchema= new Schema({
    username:{
        type:String,
        required:true
    },
    noteTitle:{
        type:String,
        required:true
    },
    noteDesc:{
        type:String
    }
})
module.exports=mongoose.model('note',notesSchema)