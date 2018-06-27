import mongoose from 'mongoose'
const Schema = mongoose.Schema

const USER = new Schema({
    id_infopersonal: String,
    name: String,
    password: { type: String, required: true, bcrypt: true },
    type_user: Number,
    rol: Number,
    status: Boolean
});

USER.plugin(require('mongoose-bcrypt'));

export default mongoose.model('user', USER);