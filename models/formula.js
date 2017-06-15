'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulaSchema = new Schema({
    body: String,
    userId: Schema.ObjectId,
    classicView: String,
    language: String
}, {
    timestamps: true
});

Object.assign(formulaSchema.statics, {

    findByUserId(userId) {
      return this.find({
        userId
      });
    }
});

module.exports = mongoose.model('Formula', formulaSchema);
