import { Model, Schema } from 'mongoose';

const tiktokSchema = new Schema(
    {
        url: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: 'No description'
        },
        author: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        music: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        nwm: {
            type: String,
            required: true
        },
        wm: {
            type: String,
            required: true
        },
        deleteAt: { type: Date }
    },
    {
        timestamps: true
    }
);

export const Tiktok = new Model(tiktokSchema);
