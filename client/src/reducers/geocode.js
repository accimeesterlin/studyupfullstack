const geocode = (state = [], action) => {

    switch (action.type) {
        case "GEOCODE_FULFILLED":
            return [...state, action.payload.data.results[0].geometry.location];
        default:
            return state;
    }

};

export default geocode;