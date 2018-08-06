'use strict';

const serializer = require('../../serializers/formula');
const mongoose = require('mongoose');

const expect = require('chai').expect;

describe('formulaSerializer', () => {
    it('should serialize formulaBody to json api format', () => {
        const _id = mongoose.Types.ObjectId();
        const userId = mongoose.Types.ObjectId();
        const formulaBody = {
            _id,
            body: 'x^2',
            language: 'pascal',
            classicView: 'x<sup>2</sup>',
            userId
        };

        const actual = serializer.serializeData(formulaBody);

        expect(actual).to.deep.equal({
            id: _id,
            type: 'formula',
            attributes: formulaBody
        });
    });

    it('should serialize many formulas', () => {
        const _id1 = mongoose.Types.ObjectId();
        const userId1 = mongoose.Types.ObjectId();
        const formulaBody1 = {
            _id: _id1,
            body: 'x^2',
            language: 'pascal',
            classicView: 'x<sup>2</sup>',
            userId: userId1
        };

        const _id2 = mongoose.Types.ObjectId();
        const userId2 = mongoose.Types.ObjectId();
        const formulaBody2 = {
            _id: _id2,
            body: 'pow(x,2)',
            language: 'c',
            classicView: 'x<sup>2</sup>',
            userId: userId2
        };

        const actual = serializer.serializeMany([formulaBody1, formulaBody2]);

        expect(actual).to.deep.equal([
            {
                id: _id1,
                type: 'formula',
                attributes: formulaBody1
            },
            {
                id: _id2,
                type: 'formula',
                attributes: formulaBody2
            }
        ]);
    });
});
