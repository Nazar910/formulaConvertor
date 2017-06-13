'use strict';
const Formula = require('./formula.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    company: String
}, {
    timestamps: true
})

Object.assign(userSchema.statics, {

    findByEmail(email) {
      return this.find({
        email
      })
    }

})

Object.assign(userSchema.methods, {

    getUserFormulas() {
      return Formula.findByUserId(this._id);
    }
});

module.exports = mongoose.model('User', userSchema);
