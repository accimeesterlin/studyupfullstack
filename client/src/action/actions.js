import axios from 'axios';


export const register = (newUser) => {
    return {
        type:"SIGN_UP",
        payload: axios({
            method:'POST',
            url:'/api/signup',
            data: newUser
        })
    }
};

export const login = (existing_user) => {

    return{
        type:"SIGN_IN",
        payload:axios({
            url:'/api/signin',
            method:'POST',
            data:existing_user
        })
    }
};


export const all_events = () => {
    return{
       type:"GET_ALL_EVENTS",
       payload: axios.get('/api/events')
    }
};


export const schedule_event = (event) => {
    return{
        type:'SCHEDULE_EVENT',
        payload: axios.post('/api/schedule', event)
    }
};

export const schedule_confirmation = (confirmation) => {
  return{
      type:'SCHEDULE_CONFIRMATION',
      confirmation
  }
};


export const current_location = () => {
  return {
      type:"GET_LOCATION",
      payload:axios.get('http://freegeoip.net/json/')
  }
};

export const geocode_marker = (address) => {
    return{
        type:"GEOCODE",
        payload:axios.get("/api/geocode?address=" + address)
    }
};


export const get_user_profile = () => {
    return{
        type:"GET_USER_PROFILE",
        payload:axios.get("/api/users")
    }
};