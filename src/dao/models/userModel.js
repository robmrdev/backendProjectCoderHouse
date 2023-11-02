import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    carts: {
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'carts'
                }
            }
        ],
        default: []
    }
});

userSchema.plugin(mongoosePaginate);
userSchema.pre('find', function () {
    this.populate('carts.cart')
})

const userModel = mongoose.model(usersCollection, userSchema)

export default userModel