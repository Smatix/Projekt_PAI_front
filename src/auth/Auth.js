import jwt from 'jwt-decode'

class Auth {
    isAuth() {
        if (localStorage.getItem('jwt') !== null) {
            return true
        } else {
            return false
        }
    }

    getRoles() {
        if (this.isAuth()) {
            const jwtObject = jwt(localStorage.getItem('jwt'));
            return jwtObject.roles;
        }
        return [];

    }

    hasRole(role) {
        return this.getRoles().includes(role)
    }
}

export default new Auth()