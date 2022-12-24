import { SCHEMA } from './../core/constants/Schema';
import { Model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 6,
            maxLength: 24
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            default: SCHEMA.DEFAULT_USER_NAME
        },
        dob: { type: Date },
        phone: { type: String, trim: true },
        gender: { type: Boolean },
        address: { type: String, trim: true },
        favorites: { type: [String] },
        socials: { type: [String] },
        deleteAt: { type: Date }
    },
    {
        timestamps: true
    }
);

export const User = new Model(userSchema);
