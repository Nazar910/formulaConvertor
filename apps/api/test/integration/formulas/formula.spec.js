const config = require('../../../config');
const request = require('supertest')(`http://localhost:${config.get('API_PORT')}`);
const _ = require('lodash');
const { expect } = require('chai');

const helpers = require('../helpers');
describe('formulas', () => {
    let user;
    let token;

    before(async () => {
        const email = 'example@example.com';
        const password = 'qwerty';

        const userBody = {
            name: 'Name',
            lastName: 'lastName',
            email,
            password,
            company: 'some'
        };

        user = await helpers.ensureUser(userBody);

        const { body } = await request
            .post('/api/users/authenticate')
            .send({email, password})
            .expect(200);

        token = body.data.token;
    });

    describe('POST', () => {
        describe('with valid body', () => {
            afterEach(async () => {
                await helpers.dropCollections(['Formula']);
            });
            it('should create a formula', async () => {
                const formulaBody = {
                    data: {
                        type: 'formula',
                        attributes: {
                            body: 'pow(x,2)',
                            classicView: 'x<sup>2</sup>',
                            language: 'c'
                        }
                    }

                };
                const { body: actualData } = await request
                    .post(`/api/formulas/${user.id}`)
                    .send(formulaBody)
                    .set({Authorization: token})
                    .expect(201);

                expect(actualData.data.type).to.equal('formula');

                const attributes = _.omit(actualData.data.attributes, ['_id']);
                expect(attributes)
                    .to.deep.equal(
                        _.assign(formulaBody.data.attributes, {
                            userId: user.id
                        }));
            });
        });

        describe('with undefined formulaBody', () => {
            it('should cause an error', async () => {
                const { body } = await request
                    .post(`/api/formulas/${user.id}`)
                    .set({Authorization: token});

                expect(body).to.deep.equal({
                    errors: [{
                        title: 'Bad request',
                        detail: 'You should pass valid formula data',
                        code: 400,
                        status: 400
                    }]
                });
            });
        });
    });
    describe('delete', () => {
        describe('by id', () => {
            let formula;
            beforeEach(async () => {
                const formulaBody = {
                    body: 'pow(x,2)',
                    classicView: 'x<sup>2</sup>',
                    language: 'c',
                    userId: user._id
                };

                formula = await helpers.ensureFormula(formulaBody);
            });

            it('should delete a formula', async () => {
                const formulaId = formula._id.toString();

                await request
                    .delete(`/api/formulas/${formulaId}`)
                    .set({ Authorization: token })
                    .expect(204);

                const deletedFormula = await helpers.findFormula(formulaId);

                expect(deletedFormula).to.be.equal(null);
            });
        });
    });

    describe('update', () => {
        describe('by id', () => {
            let formula;
            beforeEach(async () => {
                const formulaBody = {
                    body: 'pow(x,2)',
                    classicView: 'x<sup>2</sup>',
                    language: 'c',
                    userId: user._id
                };

                formula = await helpers.ensureFormula(formulaBody);
            });

            afterEach(async () => {
                await helpers.deleteFormulaById(formula._id);
            });

            it('should update a formula', async () => {
                const formulaId = formula._id.toString();

                const newFormula = {
                    body: 'pow(a,x)'
                };

                const { body } = await request
                    .patch(`/api/formulas/${formulaId}`)
                    .send(newFormula)
                    .set({ Authorization: token })
                    .expect(200);

                expect(body).to.deep.equal({
                    data: {
                        type: 'formula',
                        id: formulaId,
                        attributes: {
                            body: 'pow(a,x)',
                            classicView: 'a<sup>x</sup>',
                            language: 'c',
                            userId: user._id.toString(),
                            _id: formulaId
                        }
                    }
                });
            });
        });
    });

    describe('getAllForUser', () => {
        let formulas;
        beforeEach(async () => {
            const formulaBody1 = {
                body: 'pow(x,2)',
                classicView: 'x<sup>2</sup>',
                language: 'c',
                userId: user._id
            };

            const formulaBody2 = {
                body: 'x^2',
                classicView: 'x<sup>2</sup>',
                language: 'pascal',
                userId: user._id
            };

            const formula1 = await helpers.ensureFormula(formulaBody1);
            const formula2 = await helpers.ensureFormula(formulaBody2);

            formulas = [formula1, formula2];
        });

        it('should get user formulas', async () => {
            const { body } = await request
                .get(`/api/formulas/${user.id}`)
                .set({ Authorization: token })
                .expect(200);

            expect(body).to.deep.equal({

                data: [
                    {
                        type: 'formula',
                        id: formulas[1]._id.toString(),
                        attributes: {
                            body: 'x^2',
                            classicView: 'x<sup>2</sup>',
                            language: 'pascal',
                            userId: user._id.toString(),
                            _id: formulas[1]._id.toString()
                        }
                    },
                    {
                        type: 'formula',
                        id: formulas[0]._id.toString(),
                        attributes: {
                            body: 'pow(x,2)',
                            classicView: 'x<sup>2</sup>',
                            language: 'c',
                            userId: user._id.toString(),
                            _id: formulas[0]._id.toString()
                        }
                    }
                ]

            });
        });
    });
});
