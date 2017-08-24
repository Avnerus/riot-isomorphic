// Socket Util
class SocketUtil {
    constructor() {

    }
    initWithUrl(url) {
        console.log("Init feathers socket client", url);
        this.url = url;
        this.socket = io(url);

        this.socket.on('connect', () => {
            console.log("Socket connection is open");
        });
        this.socket.on('error', (error) => {
            console.log('Error connecting to socket', error);
        }); 
    }

    reconnect() {
        /*
        console.log("Socket Util - Reconnecting socket");
        this.initWithUrl(this.url);*/
    }

    rpc(service, args) {
        return new Promise((resolve, reject) => {
            console.log("Socket util sending ",args," to ", service);
            this.socket.emit(service,args, function(error, result) {
                if (error) { 
                    reject(error)
                } else {
                    resolve(result);
                }
            });
        });
    }
};

// Singleton
let instance = new SocketUtil();
export default instance;
