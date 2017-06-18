'use strict';
const Formula = require('../models/formula');
const _ = require('lodash');
const formulaConverter = require('../lib/formulaConverter');
const serializer = require('../serializers/formula');

async function create(req, res) {
    try {
        const { userId } = req.params;

        const { data: formulaBody } = req.body;

        if (!formulaBody) {
            return res.json({
                error: ['FormulasBody is undefined!']
            });
        }

        const data = formulaBody.attributes;
        data.classicView = formulaConverter[data.language](data.body);
        data.userId = userId;

        const formula = new Formula(data);
        await formula.save();

        const result = {
            data: serializer.serializeData(formula)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        })
    }
}

async function remove(req, res) {
    try {
        const { formulaId: id } = req.params;

        const formula = await Formula.findById(id);

        await formula.remove();

        return res.json({
            deleted: true
        })
    } catch (e) {
        res.json({
            error: [e.message]
        })
    }
}

async function getAllForUser(req, res) {
    try {
        const { userId } = req.params;

        const formulas = await Formula.findByUserId(userId);

        const result = {
            data: serializer.serializeMany(formulas)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        })
    }
}

module.exports.create = create;
module.exports.getAllForUser = getAllForUser;
module.exports.deleteFormula = remove;
