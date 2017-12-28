

module.exports = {

    authorizeUser: (isAuthenticated) => {
        if (isAuthenticated) {
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            window.location.href = '/dashboard';
        }

    },


    clearCookie: () => {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let spcook = cookies[i].split("=");
            document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;";
        }
        localStorage.clear();
        window.location.href = '/';
    },


    isEmptyObj:  (obj) => {
        for(let prop in obj){
            if(obj.hasOwnProperty(prop)){
                return true;
            }
        }
        return false;
    },

    locationsInStorage: (event) => {
        const locations = [];
        event ? event.map(({place}) => {
            locations.push(place);
        }) : console.log("Not Loading yet");

        localStorage.setItem('locations', JSON.stringify(locations));
        return locations;
    }


};