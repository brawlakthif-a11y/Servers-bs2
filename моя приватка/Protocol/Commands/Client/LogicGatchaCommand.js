const PiranhaMessage = require('../../PiranhaMessage')
const ByteStream = require("../../../ByteStream")
const database = require('../../../Database/DatabaseManager');
const LogicBoxCommand = require('../Server/LogicBoxCommand');
const LoginFailedMessage = require('../../Messages/Server/Auth/LoginFailedMessage');

class LogicGatchaCommand extends PiranhaMessage {
  constructor(bytes, session) {
    super(bytes);
    this.session = session;
    this.commandID = 500;
    this.version = 0x0;
    this.stream = new ByteStream(bytes);
  }

  decode() {
    for (let i = 0; i < 9; i++) {
      this.stream.readVInt();
    }
    this.selectedBoxType = this.stream.readVInt();
    console.log(this.selectedBoxType);
  }

  async process() {        
        const account = await database.getAccount(this.session.lowID);

        switch (this.selectedBoxType) {
            case 5: // Brawl Box
                this.selectedBoxType = 11;
                account.brawlBox -= 100;
                await database.replaceValue(account.lowID, 'brawlBox', account.brawlBox);
                break;
            case 4: // Big Box
                this.selectedBoxType = 12;
                account.bigBox -= 10;
                await database.replaceValue(account.lowID, 'bigBox', account.bigBox);
                break;
            case 3: // Shop Box
                this.selectedBoxType = 11;
                account.gems -= 80;
                await database.replaceValue(account.lowID, 'gems', account.gems);
                break;
            case 1: // Shop Big Box
                this.selectedBoxType = 12;
                account.gems -= 30;
                await database.replaceValue(account.lowID, 'gems', account.gems);
                break;            
        }        
        new LogicBoxCommand(this.session, account, this.selectedBoxType).send();
    }    
}

module.exports = LogicGatchaCommand;