const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")
const LoginOKMessage = require('../../Server/Auth/LoginOKMessage')
const LoginFailedMessage = require('../../Server/Auth/LoginFailedMessage')
const OwnHomeDataMessage = require('../../Server/Auth/OwnHomeDataMessage')
const crypto = require('crypto');
const database = require("../../../../Database/DatabaseManager")

class LoginMessage extends PiranhaMessage {
  constructor (bytes, session) {
    super(session)
    this.id = 10101
    this.version = 0
    this.session = session
    this.stream = new ByteStream(bytes);
  }

  async decode() {
    this.stream.readInt()
    this.session.lowID = this.stream.readInt()
    this.session.token = this.stream.readString()

    this.major = this.stream.readInt()
    this.minor = this.stream.readInt()
    this.build = this.stream.readInt()
    this.fingerprint_sha = this.stream.readString() 
    this.DeviceModel = this.stream.readString()
    this.isAndroid = this.stream.readVInt()
  }
      
  async process () {
    if (this.major !== 19) {
      return await new LoginFailedMessage(this.session, `The client version does not match the server version.`, 8).send();
    }

    if (!this.session.token) {
      this.session.token = crypto.randomBytes(Math.ceil(36/2)).toString('hex').slice(0, 36);
      await database.createAccount(this.session.token);
    }

    const account = await database.getAccountToken(this.session.token);
    if(account == null) return await new LoginFailedMessage(this.session, `Unknown error while loading account.`, 18).send();    
  
    this.session.lowID = account.lowID;
    this.session.Resources = account.Resources;
	
    await new LoginOKMessage(this.session).send();
    await new OwnHomeDataMessage(this.session, account).send(); 
  }
}

module.exports = LoginMessage