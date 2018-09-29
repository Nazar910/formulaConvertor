import BaseClient from './base';

export default class Formulas extends BaseClient {
    async getUserFormulas (userId) {
        const response = await this.get(`/api/formulas/${userId}`);
        return response.json();
    }

    /**
     * Send a request to api to create a formula
     * @param {String} userId
     * @param {Object} body - data for formula creation
     *
     * @returns {Promise} promise that resolves with response
     */
    async postOne (userId, body) {
        const response = await this.post(`/api/formulas/${userId}`, body);
        return response.json();
    }

    /**
     * Send a request to api to update a formula
     * @param {String} formulaId - id of a formula
     * @param {Object} body - data for formula update
     *
     * @returns {Promise} promise that resolves with response
     */
    async patchOne (formulaId, body) {
        const response = await this.patch(`/api/formulas/${formulaId}`, body);
        return response.json();
    }

    /**
     * Send a request to api to delete a formula
     * @param {String} formulaId - id of a formula
     *
     * @returns {Promise} promise that resolves when request is done
     * @throws {Error} when status code is not 204
     */
    async deleteOne (formulaId) {
        const response = await this.delete(`/api/formulas/${formulaId}`);

        if (response.status !== 204) {
            throw new Error('Failed to delete formula ' + formulaId);
        }
    }
}
