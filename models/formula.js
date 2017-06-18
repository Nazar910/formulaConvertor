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

    findById(_id) {
        return this.findOne({_id});
    },

    findByUserId(userId) {
      return this.find({
        userId
      }).sort({
          updatedAt: -1
      });
    }
});

module.exports = mongoose.model('Formula', formulaSchema);
