const get_user_info = (state = {}, action) => {

    switch (action.type) {
        case "GET_USER_PROFILE_FULFILLED":
            return {...state, ...action.payload.data};

        default:
            return state;
    }
};

export default get_user_info;