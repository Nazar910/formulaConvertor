const serializer = require('../serializers/formula');
const repository = require('../repositories/formula');
const logger = require('../logger');
const { middleWarifyAsync } = require('../middleware');
const { BadRequest } = require('../errors');

async function create (req, res) {
    const { userId } = req.params;
    logger.info('In /api/formulas POST', userId);

    const { data: formulaBody } = req.body;

    if (!formulaBody) {
        logger.error('Formula body is not provided');
        throw new BadRequest('You should pass valid formula data');
    }

    const formula = await repository.createFormula(formulaBody, userId);

    res.data = serializer.serializeData(formula);
    res.statusCode = 201;
}

async function update (req, res) {
    const { formulaId: id } = req.params;
    logger.info('In /api/formulas/formulaId PATCH', id);

    const { body } = req.body;

    const formula = await repository.updateFormula(id, body);

    res.data = serializer.serializeData(formula);
    res.statusCode = 200;
}

async function remove (req, res) {
    const { formulaId: id } = req.params;
    logger.info('In /api/formulas/formulaId DELETE', id);
    await repository.deleteFormula(id);

    res.statusCode = 204;
    res.data = {};
}

async function getAllForUser (req, res) {
    const { userId } = req.params;
    logger.info('In /api/formulas/userId GET', userId);
    const formulas = await repository.getAllForUser(userId);
    console.log('Formulas', formulas);

    res.data = serializer.serializeMany(formulas);
}

module.exports = {
    create: middleWarifyAsync(create),
    getAllForUser: middleWarifyAsync(getAllForUser),
    remove: middleWarifyAsync(remove),
    update: middleWarifyAsync(update)
};
