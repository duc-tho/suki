import { Model, Schema } from 'mongoose';

const pushSessionSchema = new Schema(
    {
        token: {
            type: String,
            required: true
        },
        deleteAt: { type: Date }
    },
    {
        timestamps: true
    }
);

export const PushSession = new Model(pushSessionSchema);
