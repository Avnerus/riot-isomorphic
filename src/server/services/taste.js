export default class TasteService {
    setup(app) {
        this.app = app;
    }
    find(params) {
        console.log("Taste service! fruit: params: ", params);
        return new Promise((resolve, reject) => {
            if (!params.user) {
                reject({message: "Only logged in users are allowed to taste the fruit"});
            } else {
                console.log("Taste Service --> Taste fruit ", params.query.fruitName);
                let taste;
                if (Math.random() > 0.5) {
                    taste = "Good!";
                } else {
                    taste = "Bad :(";
                }
                resolve({
                        result: taste
                });
            }
        });
    }
}
