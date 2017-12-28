

const location_info = (state = {}, action) => {

    switch(action.type){
        case "GET_LOCATION_FULFILLED":
            return { ...state, ...action.payload.data };

        case "EVENT_LOCATION_FULFILLED":
            console.log("Action: ", action.payload.data.results[0]);
            return [...state, ...action.payload.data.results[0].geometry];

        default:
            return state;
    }

};

export default location_info;