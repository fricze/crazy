class Query extends EventTarget {
    constructor(url = "", dependencies) {
        super();
        this.url = url;
    }

    call() {
        fetch(this.url)
            .then(val => {
                if (!val.ok) {
                    this.#failure(val);
                }

                this.#success(val);
            })
            .catch(err => this.#failure(err));
    }

    #success(value) {
        this.dispatchEvent(new CustomEvent("success", { value }));
    }

    #failure(value) {
        this.dispatchEvent(new CustomEvent("failure", { value }));
    }
}


const q = new Query("https://google.pl");


