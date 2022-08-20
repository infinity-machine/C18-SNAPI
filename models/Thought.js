const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thought_text: {
        type: String, 
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: (current) => {
            return dateFormat(current);
        }
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reaction_count').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;