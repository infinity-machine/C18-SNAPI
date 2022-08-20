const user_router = require('express').Router();
const { User }  = require('../models');
const { Thought } = require ('../models');

user_router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users); 
});

user_router.get('/users/:id', async (req, res) => {
    const user = await User.findOne({
        _id: req.params.id
    });
    res.send(user)
});

user_router.post('/users', async (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) throw new Error('YOU MUST ENTER EMAIL AND PASSWORD');
    const new_user = await User.create(req.body);
    res.send(`USER ${new_user.username} CREATED`);
});

user_router.post('/users/:id/friends/:friendId', async (req, res) => {
    const user = await User.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $addToSet: {
            friends: req.params.friendId
        }
    })
    res.send(`USER ${req.params.friendId} ADDED TO USER ${user._id} FRIEND LIST`)
})

user_router.put('/users/:id', async (req, res) => {
    const updated_user = await User.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $set: req.body
    });
    res.send(`USER ${updated_user.username} UPDATED`)
})

user_router.delete('/users/:id', async (req, res) => {
    const deleted_user = await User.findOneAndDelete({
        _id: req.params.id
    });
    await Thought.deleteMany({
        username: deleted_user.username
    })
    res.send(`USER ${deleted_user.username} DELETED ALONG WITH ALL RELATED THOUGHTS`);
})

// user_router.delete('/users/:userId/friends/:friendId', async (req, res) => {
//     console.log(req.body)
// })

// FRIENDS


module.exports = user_router;