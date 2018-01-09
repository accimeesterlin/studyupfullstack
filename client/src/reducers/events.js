
const events = (state = [], action) => {
    switch(action.type){
        case "GET_ALL_EVENTS_FULFILLED":
            return [...state, ...action.payload.data];


        case "DELETE_EVENT_FULFILLED":
            const {_id} = action.payload.data;
            console.log("State in Reducers: ", _id);
            return state.filter((el) => el._id !== _id );  

        default:
            return state;
    }
};

export default events;
