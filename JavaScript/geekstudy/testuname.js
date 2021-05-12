function main(str) {
   const parser = new Parser();
   parser.split();
   let res = parser.response;
   console.log('res:', res);
}

class Parser {
    constructor() {
        this.states = [0, 1, 2, 3, 4, 5, 6];
        this.resp = '';
        this.body1 = '';
        this.body2 = '';
        this.current = 0;
        this.values = {};
    }

    get response() {
        this.resp = this.states.join('');
        return this.resp;
    }
    split (str) {
        for (let c of str) {
            this.receiveChar(c);
        }
    }
    receiveChar (c) {
        if (this.current === 0) {
            if (c === ' ') {
                this.
                this.current = 1;
            } else {
                this.body1 += c;
            }
        } else if (this.current === 1) {
            if (c === ' ') {

            } else {
                this.body
            }
        } 
    }
}