const PiranhaMessage = require('../../PiranhaMessage')
const ByteStream = require("../../../ByteStream")
const LobbyInfoMessage = require('../Server/LobbyInfoMessage')

class KeepAliveMessage extends PiranhaMessage {
  constructor (bytes, session) {
    super(session)
    this.session = session
    this.id = 10108
    this.version = 0
    this.stream = new ByteStream(bytes)
  }

  async decode () {
    this.stream.readInt()
  }

  async process () {
    await new LobbyInfoMessage(this.session).send()
  }
}

module.exports = KeepAliveMessage
