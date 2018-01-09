const get_user_info = (state = {}, action) => {

    switch (action.type) {
        case "GET_USER_PROFILE_FULFILLED":
            return {...state, ...action.payload.data};


        case "DELETE_EVENT_FULFILLED":
            const {_id} = action.payload.data;
            return {...state, event: state.event.filter((el) => el._id !== _id)};

        default:
            return state;
    }
};

export default get_user_info;