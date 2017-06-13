'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FORTRAN = 'fortran';
const C = 'c/c++';
const PASCAL = 'pascal';

const formulaSchema = new Schema({
    body: String,
    userId: Schema.ObjectId,
    classicView: String,
    language: {
      type: String,
      enum: [FORTRAN, C, PASCAL]
    }
}, {
    timestamps: true
});

Object.assign(formulaSchema.statics, {

    FORTRAN,
    C,
    PASCAL

    findByUserId(userId) {
      return this.find({
        userId
      });
    }
});

module.exports = mongoose.model('Formula', formulaSchema);
