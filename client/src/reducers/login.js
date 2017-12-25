const loginReducer = (state = {isAuthenticated: false}, action) => {
    switch (action.type) {
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


export default loginReducer;