import { dbConnect } from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcrypt"

export async function POST(request) {
    const { first_name, last_name, email, password } = await request.json()

    if (!first_name || !last_name || !email || !password) {
        return Response.json({
            message: "All feilds are required"
        },
            {
                status: 201
            })
    }

    try {
        await dbConnect()

        const user = await User.findOne({ email })
        if (user) {
            return Response.json({
                message: "User already register with this email"
            },
                {
                    status: 409
                })

        }

        const hashPassword = bcrypt.hash(10, user.password)

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashPassword
        })

        await newUser.save()

        return Response.json({
            message: "User register successfully"
        },
            {
                status: 201
            })


    } catch (error) {
        return Response.json({
            message: "Server error", error
        },
            {
                status: 500
            })
    }
}