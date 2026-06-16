const PiranhaMessage = require('../../PiranhaMessage')
const ByteStream = require("../../../ByteStream")
const database = require("../../../Database/DatabaseManager")

class LogicClaimDailyRewardCommand extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 503
        this.version = 0        
        this.stream = new ByteStream(bytes);
    }

    decode(self){
        for (let i of Array(9).keys()){this.stream.readVInt()}
        this.slot = this.stream.readVInt()
    }

    async process(){        
        const account = await database.getAccount(this.session.lowID)        
        account.brawlBox += 20;
        await database.replaceValue(this.session.lowID, 'brawlBox', account.brawlBox);
    }        
}

module.exports = LogicClaimDailyRewardCommand