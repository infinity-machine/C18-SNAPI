const thought_router = require('express').Router();
const { Thought } = require('../models');
const { User } = require('../models')

thought_router.get('/thoughts', async (req, res) => {
    const thoughts = await Thought.find();
    res.send(thoughts);
});

thought_router.get('/thoughts/:id', async (req, res) => {
    const thought = await Thought.findOne({
        _id: req.params.id
    });
    res.send(thought)
});

thought_router.post('/thoughts', async (req, res) => {
    // const { thought_text, username} = req.body
    const new_thought = await Thought.create(req.body);
    const thought_user = await User.findOneAndUpdate({
        username: req.body.username
    }, 
    {
        $addToSet: {
            thoughts: new_thought._id
        }
    })
    res.send(`THOUGHT ${new_thought._id} CREATED ON USER ${thought_user._id}`);
});

thought_router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    const thought = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId
    },
    {
        $addToSet: {
            reactions: req.body
        }
    })
    res.send(`REACTION ${req.body.reaction_body} ADDED ON THOUGHT ${thought._id}`)
})

thought_router.put('/thoughts/:id', async (req, res) => {
    const updated_thought = await Thought.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $set: req.body
    });
    res.send(`THOUGHT ${updated_thought._id} UPDATED`)
});

thought_router.put('/thoughts/:thoughtId/reactions', async (req, res) => {
    // UPDATE THOUGHT REACTION BY ID
})

thought_router.delete('/thoughts/:id', async (req, res) => {
    const deleted_thought = await Thought.findOneAndDelete({
        id: req.params.id
    });
    res.send(`THOUGHT ${deleted_thought._id} DELETED`)
});

thought_router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thought = await Thought.findOne({
        _id: req.params.thoughtId
    })
    for (let i = 0; i < thought.reactions.length; i++) {
        if (thought.reactions[i]._id === req.params.reactionId) thought.reactions.splice(i, 1)
    }
    res.send(`REACTION ${req.params.reactionId} DELETED FROM THOUGHT ${thought._id}`)
})

module.exports = thought_router;