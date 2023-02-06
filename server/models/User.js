import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    files: [{
        fileName: {
            type: String,
            required: true
        },
        secureFileName: {
            type: String,
            required: true
        },
        fileSize: {
            type: Number,
            required: true
        },
        fileType: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        data: {
            url: {
                type: String
            },
            fields: {
                type: Object
            }
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

export default User