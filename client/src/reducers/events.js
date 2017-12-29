
const events = (state = [], action) => {


    switch(action.type){

        case "GET_ALL_EVENTS_FULFILLED":
            return {...state, ...action.payload.data};

        default:
            return state;
    }
};

export default events;
