// Fetch Util
class FetchUtil {
    constructor() {
    }

    postJSON(target, data) {
        return fetch(target, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
        })
        .then((response) => {
             return response.json();
        })
    }

    get(target) {
        return fetch(target, {
             method: 'GET',
             credentials: 'include',
             headers: {
                 'Accept': 'application/json'
             }
        })
        .then((response) => {
             return response.json();
        })
    }

};

// Singleton
let instance = new FetchUtil();
export default instance;
