'use strict';
describe('app', () => {

    const expect = require('chai').expect;
    const axios = require('axios');
    const mongoose = require('mongoose');
    const _ = require('lodash');

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
                        const userBody = {
                            user: {
                                name: 'Name',
                                lastName: 'lastName',
                                email: 'email@example.com',
                                password: 'qwerty',
                                company: 'some'
                            }
                        };
                        const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                        const actualData = _.omit(resp.data, ['__v', '_id', 'password']);
                        expect(actualData).to.deep.equal({
                            name: 'Name',
                            lastName: 'lastName',
                            email: 'email@example.com',
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

        const Formula = require('../models/formula');

        let user;
        beforeEach(async () => {

            try {
                const userBody = {
                    user: {
                        name: 'Name',
                        lastName: 'lastName',
                        email: 'email@example.com',
                        password: 'qwerty',
                        company: 'some'
                    }
                };
                const resp = await axios.post('http://localhost:3300/api/users/', userBody);

                user = resp.data;

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
                            formula: {
                                body: 'x^2',
                                classicView: 'x<sup>2</sup>',
                                language: 'pascal'
                            }
                        };
                        const resp = await axios.post(`http://localhost:3300/api/formulas/${user._id}`, formulaBody);

                        const actualData = _.omit(resp.data.formula, ['__v', '_id', 'userId', 'createdAt', 'updatedAt']);
                        const actualUserId = resp.data.formula.userId;

                        expect(actualData).to.deep.equal(formulaBody.formula);
                        expect(actualUserId).to.equal(user._id);

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

        describe('getAllForUser', () => {

            let user;
            beforeEach(async () => {

                try {
                    const userBody = {
                        user: {
                            name: 'Name',
                            lastName: 'lastName',
                            email: 'email@example.com',
                            password: 'qwerty',
                            company: 'some'
                        }
                    };
                    const resp = await axios.post('http://localhost:3300/api/users/', userBody);
                    user = resp.data;

                    const formulaBody = {
                        formula: {
                            body: 'x^2',
                            classicView: 'x<sup>2</sup>',
                            language: Formula.PASCAL
                        }
                    };
                    await axios.post(`http://localhost:3300/api/formulas/${user._id}`, formulaBody);


                } catch (e) {
                    throw e;
                }

            });

            it('should get user formulas', async () => {

                try {
                    const resp = await axios.get(`http://localhost:3300/api/formulas/${user._id}`);

                    const actualData = resp.data.map(formula => _.pick(formula, ['body', 'classicView', 'language']));

                    expect(actualData).to.deep.equal([{
                        body: 'x^2',
                        classicView: 'x<sup>2</sup>',
                        language: Formula.PASCAL
                    }]);

                } catch (e) {
                    console.error(e);
                    throw e;
                }

            });

        });

    });

});
