import mongoose from 'mongoose'
const Schema = mongoose.Schema

const USER = new Schema({
    id_infopersonal: String,
    name: String,
    password: String,
    type_user: Number, 
    rol: Number,
    status: Boolean
});

export default mongoose.model('user', USER);