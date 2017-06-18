'use strict';
const Formula = require('./formula.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

//TODO make email unique
const userSchema = new Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    company: String
});

Object.assign(userSchema.statics, {

    findByEmail(email) {
      return this.findOne({
        email
      })
    },

    findById(id) {
        return this.findOne({
            _id: id
        })
    }

});

Object.assign(userSchema.methods, {

    getUserFormulas() {
        return Formula.findByUserId(this._id);
    },

    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    },

    isValidPassword(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    }
});

module.exports = mongoose.model('User', userSchema);
