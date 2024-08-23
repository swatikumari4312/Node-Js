const mongoose = require('mongoose');

const menuItems = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        require: true,
    },
    taste: {
        type: String,
        enum: ['sweet','spicy','sour'],
        require: true,
    },
    is_drink: {
        typr: Boolean,
    }
})

const menu = mongoose.model('menu', menuItems);
module.exports = menu;