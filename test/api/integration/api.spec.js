const config = require('../../../config');
const request = require('supertest')(`http://localhost:${config.get('API_PORT')}`);
const expect = require('chai').expect;
const _ = require('lodash');
//const helpers = require('../helpers');

xdescribe('api', () => {
    after(() => helpers.dropCollections());



    describe('formulas', () => {
        let user;
        let token;
        before(async () => {
            try {
                const email = 'email1@example.com';
                const password = 'qwerty';

                const userBody = {
                    name: 'Name',
                    lastName: 'lastName',
                    email,
                    password,
                    company: 'some'
                };

                user = await helpers.ensureUser(userBody);
                const { data } = await request.post('/api/users/authenticate', {email, password});
                token = data.token;
            } catch (e) {
                console.error(e);
                throw e;
            }
        });

        describe('create', () => {
            describe('with valid body', () => {
                it('should create a formula', async () => {
                    try {
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
                        const resp = await request
                            .post(`/api/formulas/${user.id}`, formulaBody)
                            .set({Authorization: token});

                        const { data: actualData } = resp.data;

                        expect(actualData.type).to.equal('formula');

                        const attributes = _.omit(actualData.attributes, ['_id']);
                        expect(attributes)
                            .to.deep.equal(
                                _.assign(formulaBody.data.attributes, {
                                    userId: user.id
                                }));
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                });
            });

            describe('with undefined formulaBody', () => {
                it('should cause an error', async () => {
                    try {
                        const formulaBody = {};
                        const resp = await request
                            .post(`/api/formulas/${user.id}`, formulaBody)
                            .set({Authorization: token});

                        expect(resp.data).to.deep.equal({
                            error: ['FormulasBody is undefined!']
                        });
                    } catch (e) {
                        throw e;
                    }
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
                    try {
                        const formulaId = formula._id.toString();
                        const resp = await request
                            .delete({
                            url: `/api/formulas/${formulaId}`,
                            method: 'DELETE',
                            headers: {
                                Authorization: token
                            }
                        });

                        const { data } = resp;

                        expect(data).to.deep.equal({
                            deleted: true
                        });

                        const deletedFormula = await helpers.findFormula(formulaId);

                        expect(deletedFormula).to.be.equal(null);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
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

                it('should update a formula', async () => {
                    try {
                        const formulaId = formula._id.toString();

                        const newFormula = {
                            body: 'pow(a,x)'
                        };

                        const resp = await axios({
                            url: `/api/formulas/${formulaId}`,
                            method: 'PATCH',
                            data: newFormula,
                            headers: {
                                Authorization: token
                            }
                        });

                        const { data } = resp;

                        expect(data).to.deep.equal({
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
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                });
            });
        });

        describe('getAllForUser', () => {
            let user;
            let formulas;
            beforeEach(async () => {
                try {
                    const userBody = {
                        name: 'Name',
                        lastName: 'lastName',
                        email: 'email2@example.com',
                        password: 'qwerty',
                        company: 'some'
                    };

                    user = await helpers.ensureUser(userBody);

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
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            });

            it('should get user formulas', async () => {
                try {
                    const { data: responseData } = await axios({
                        url: `/api/formulas/${user.id}`,
                        method: 'GET',
                        headers: {
                            Authorization: token
                        }
                    });

                    expect(responseData).to.deep.equal({

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
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            });
        });
    });
});
