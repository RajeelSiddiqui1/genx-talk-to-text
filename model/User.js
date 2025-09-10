import mongoose, { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        first_name: {
            required: true,
            type: String
        },
        last_name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        }
    },
    {
        timestamp:true
    }
)

const User = mongoose.models.User || model("User", userSchema)

export default User