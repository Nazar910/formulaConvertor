'use strict';
const serializer = require('../serializers/formula');
const repository = require('../repositories/formula');

async function create (req, res) {
    try {
        const { userId } = req.params;

        const { data: formulaBody } = req.body;

        if (!formulaBody) {
            return res.json({
                error: ['FormulasBody is undefined!']
            });
        }

        const formula = await repository.createFormula(formulaBody, userId);

        const result = {
            data: serializer.serializeData(formula)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

async function update (req, res) {
    try {
        const { formulaId: id } = req.params;

        const { body } = req.body;

        const formula = await repository.updateFormula(id, body);

        const result = {
            data: serializer.serializeData(formula)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

async function remove (req, res) {
    try {
        const { formulaId: id } = req.params;

        await repository.deleteFormula(id);

        return res.json({
            deleted: true
        });
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

async function getAllForUser (req, res) {
    try {
        const { userId } = req.params;

        const formulas = await repository.getAllForUser(userId);

        const result = {
            data: serializer.serializeMany(formulas)
        };

        res.json(result);
    } catch (e) {
        res.json({
            error: [e.message]
        });
    }
}

module.exports = {
    create,
    getAllForUser,
    remove,
    update
};
