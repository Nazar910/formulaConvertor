'use strict';
describe('app', () => {

    const expect = require('chai').expect;
    const axios = require('axios');
    const mongoose = require('mongoose');
    const _ = require('lodash');

    const helpers = require('../helpers');

    let app;
    before(() => {

        process.env.MONGO_URI = 'mongodb://localhost/test_db';
        process.env.API_PORT = 3300;
        process.env.SECRET='test';
        app = require('../index');

    });

    after(() => {
        mongoose.connection.db.dropDatabase();
    });

    describe('users', () => {

        describe('create', () => {

            describe('with valid userBody', () => {

                it('should create a user', async () => {

                    try {
                        const reqBody = {
                            data: {
                                type: 'user',
                                attributes: {
                                    name: 'Name',
                                    lastName: 'lastName',
                                    email: 'email@example.com',
                                    password: 'qwerty',
                                    company: 'some'
                                }
                            }
                        };
                        const resp = await axios.post('http://localhost:3300/api/users/', reqBody);

                        const actualData = resp.data;

                        expect(actualData.data.type).to.equal('user');

                        const attributes = _.omit(actualData.data.attributes, ['_id']);
                        const expectedAttributes = _.omit(reqBody.data.attributes, ['password']);

                        expect(attributes).to.deep.equal(expectedAttributes);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }

                });

            });

            describe('with undefined userBody', () => {

                it('should cause an error', async () => {

                    try {
                        const userBody = {};
                        const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                        expect(resp.data).to.deep.equal({
                            error: ['Userbody is undefined!']
                        });
                    } catch (e) {
                        throw e;
                    }

                });

            });

        });

        describe('update', () => {

            let user;
            beforeEach(async () => {

                try {
                    const userBody = {
                        name: 'Name',
                        lastName: 'lastName',
                        email: 'example@example.com',
                        password: 'qwerty',
                        company: 'some'
                    };

                    user = await helpers.ensureUser(userBody);

                } catch (e) {
                    console.error(e);
                    throw e;
                }

            });

            afterEach(() => helpers.deleteUserById(user._id));

            describe('with valid userBody', () => {

                it('should update a user', async () => {

                    try {
                        const reqBody = {
                            data: {
                                type: 'user',
                                attributes: {
                                    name: 'NewName',
                                    email: 'newEmail@example.com'
                                }
                            }
                        };
                        const resp = await axios.patch(`http://localhost:3300/api/users/${user._id}`, reqBody);

                        const actualData = resp.data;

                        expect(actualData.data.type).to.equal('user');

                        const attributes = _.omit(actualData.data.attributes, ['_id']);
                        const expectedAttributes = _.omit(reqBody.data.attributes, ['password']);

                        expect(attributes).to.deep.equal({
                            name: 'NewName',
                            lastName: 'lastName',
                            email: 'newEmail@example.com',
                            company: 'some'
                        });
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }

                });

            });

            describe('with undefined userBody', () => {

                it('should cause an error', async () => {

                    try {
                        const userBody = {};
                        const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                        expect(resp.data).to.deep.equal({
                            error: ['Userbody is undefined!']
                        });
                    } catch (e) {
                        throw e;
                    }

                });

            });

        })

    });

    describe('formulas', () => {

        let user;
        before(async () => {

            try {
                const userBody = {
                    name: 'Name',
                    lastName: 'lastName',
                    email: 'email1@example.com',
                    password: 'qwerty',
                    company: 'some'
                };

                user = await helpers.ensureUser(userBody);

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
                        const resp = await axios.post(`http://localhost:3300/api/formulas/${user.id}`, formulaBody);

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
                        const resp = await axios.post(`http://localhost:3300/api/formulas/${user._id}`, formulaBody);

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
                        const resp = await axios.delete(`http://localhost:3300/api/formulas/${formulaId}`);

                        const { data } = resp;

                        expect(data).to.deep.equal({
                            deleted: true
                        });

                        const deletedFormula = await helpers.findFormula(formulaId);

                        expect(deletedFormula).to.be.null;

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

                        const resp = await axios.patch(`http://localhost:3300/api/formulas/${formulaId}`, newFormula);

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

                    formulas = [formula1,formula2];

                } catch (e) {
                    console.error(e);
                    throw e;
                }

            });

            it('should get user formulas', async () => {

                try {
                    const { data: responseData } = await axios.get(`http://localhost:3300/api/formulas/${user._id}`);

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
                                    _id: formulas[1]._id.toString(),
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
                                    _id: formulas[0]._id.toString(),
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
