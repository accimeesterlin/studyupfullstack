import axios from 'axios';


export const register = (newUser) => {
    return {
        type:"SIGN_UP",
        payload: axios({
            method:'POST',
            url:'/api/signup',
            data: newUser
        })
    }
};

export const login = (existing_user) => {

    return{
        type:"SIGN_IN",
        payload:axios({
            url:'/api/signin',
            method:'POST',
            data:existing_user
        })
    }
};



export const authenticate = (isAuthenticated) => {
    return{
        type:"SET_AUTHENTICATION",
        isAuthenticated
    }
};
