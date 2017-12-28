

const schedule = (state = {}, action) => {

    switch(action.type){

        case "SCHEDULE_EVENT_FULFILLED":
            return {...state, ...action.payload.data};


        case "SCHEDULE_CONFIRMATION":
            return {...state, msg: action.confirmation};

        default:
            return state;
    }
};


export default schedule;