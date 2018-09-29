import BaseClient from './base';

export default class Users extends BaseClient {
    constructor(token) {
        super(token);
    }

    /**
     * Get user profile
     */
    async getUserProfile() {
        const response = await this.get('/api/users/profile');
        return await response.json();
    }

    /**
     * Make a request to api to delete user
     * @param {String} userId - id of a user
     *
     * @returns {Promise} promise that resolves when request is finished
     * @throws {Error} if status code is not 204
     */
    async deleteOne(userId) {
        const response = await this.delete(`/api/users/${userId}`);

        if (response.status !== 204) {
            throw new Error(`Failed to delete user ${userId}`);
        }
    }

    /**
     * Update token for user
     * @param {String} email - user email
     * @param {String} password - user pass
     *
     * @returns {Promise} promise that resolves when update of token is done
     * @throws {Error} when email or password is invalid
     */
    async authenticate(email, password) {
        const response = await this.post(`/api/users/authenticate`, {
            email,
            password
        });
        const { token } = (await response.json()).data;

        if (!token) {
            throw new Error('Email or password are incorrect!');
        }
        this.token = token;
        return token;
    }

    /**
     * Checks whether token is valid
     */
    async checkIfLoggedIn() {
        const response = await this.get('/api/users/profile');

        if (response.status !== 200) {
            return false;
        }

        return true;
    }
}
