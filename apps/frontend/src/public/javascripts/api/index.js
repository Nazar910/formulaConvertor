import FormulasClient from './formulas';
import Users from './users';

export default {
    formulas: new FormulasClient(localStorage.getItem('token')),
    users: new Users(localStorage.getItem('token'))
}
