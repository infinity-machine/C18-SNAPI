const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reaction_id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reaction_body: {
      type: String,
      required: true
    },
    username: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: (current) => {
            return dateFormat(current);
        }
    },
  });

  module.exports = reactionSchema;