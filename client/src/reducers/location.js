

const location_info = (state = {}, action) => {

    switch(action.type){
        case "GET_LOCATION_FULFILLED":
            return { ...state, ...action.payload.data };


        default:
            return state;
    }

};

export default location_info;