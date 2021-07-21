const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const UserSchema = new Schema({
    post: {
        type: String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    is_active:{
        type:Boolean,
        default:1
    }
}, { collection: 'post', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('post', UserSchema);
