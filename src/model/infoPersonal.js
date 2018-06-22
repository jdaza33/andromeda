import mongoose from 'mongoose'
const Schema = mongoose.Schema

const INFO_PERSONAL = new Schema({
    name: String,
    lastname: String,
    nit: String,
    email: String,
    birthdate: Date,
    address: {
        country: String,
        state: String,
        city: String,
        location: String,
        description: String
    },
    photo: String
});

export default mongoose.model('infopersonal', INFO_PERSONAL);

