import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import timestamp from 'mongoose-timestamp'
const Schema = mongoose.Schema

const USER = new Schema({
    id_infopersonal: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    type_user: {
        type: Number,
        default: 0
    },
    rol: {
        type: Number,
        default: 0
    },
    ref: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

USER.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

USER.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

USER.plugin(timestamp);

export default mongoose.model('user', USER);