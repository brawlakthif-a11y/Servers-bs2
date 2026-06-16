// todo

const PiranhaMessage = require('../../PiranhaMessage')
const ByteStream = require("../../../ByteStream")
const database = require("../../../Database/DatabaseManager")

class LogicBoxCommand extends PiranhaMessage {
    constructor(session, account, boxType) {
        super();
        this.id = 24111;
        this.session = session;
        this.account = account;
        this.boxType = boxType;        
        this.stream = new ByteStream();
    }

    async encode() {           
    }
}

module.exports = LogicBoxCommand;