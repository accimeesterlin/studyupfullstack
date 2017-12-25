const userReducer = (state = {isAuthenticated: false}, action) => {
    switch (action.type) {
        case "SIGN_UP_FULFILLED":
            return {
                ...state,
                msg: action.payload.data,
                isAuthenticated:true,
                error: false
            };

        case "SIGN_UP_REJECTED":
            return {
                ...state,
                msg: action.payload.response.data,
                isAuthenticated: false,
                error: true
            };

        case "SIGN_IN_FULFILLED":
            return{
                ...state,
                isAuthenticated:true,
                error:false
            };



        default:
            return state;
    }

};


export default userReducer;