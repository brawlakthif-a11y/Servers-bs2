const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")


class OwnHomeDataMessage extends PiranhaMessage {
  constructor (session, account) {
    super(session)
    this.id = 24101
    this.session = session
    this.account = account
    this.version = 0
    this.stream = new ByteStream()
  }

  async encode () {
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(this.account.trophies) // trophies
    this.stream.writeVInt(this.account.highestTrophies) // highestTrophies

    this.stream.writeVInt(0)
    this.stream.writeVInt(1)

    this.stream.writeVInt(this.account.experience) // experience

    this.stream.writeDataReference(28, this.account.thumbnail)
    this.stream.writeDataReference(43, this.account.nameColor)

    this.stream.writeVInt(0) // PlayedGamemodesArray
    this.brawlers = [{
      id: 0,
      cardID: 0,
      unlocked: true,
      level: 0,
      points: 0,
      trophies: 0
      }
    ]
    this.stream.writeVInt(1) // SelectedSkins
    this.stream.writeDataReference(29, this.account.skinId)
    
    this.stream.writeVInt(this.account.skins.length || 0) // UnlockedSkins
    for(let skin of this.account.skins || []){
      this.stream.writeDataReference(29, skin)
    }

    this.stream.writeVInt(0)
    this.stream.writeVInt(this.account.highestTrophies)
    this.stream.writeVInt(0)

    this.stream.writeBoolean(false)
    this.stream.writeVInt(1)
    this.stream.writeBoolean(true)

    this.stream.writeVInt(this.account.tokensdoubler) // tokensdoubler
    this.stream.writeVInt(0)

    this.stream.writeByte(8)

    this.stream.writeBoolean(false)
    this.stream.writeBoolean(false)
    this.stream.writeBoolean(false)

    this.stream.writeVInt(0) // name change cost
    this.stream.writeVInt(0) // name change cooldown
    this.offers = []

    // const CallSHOP = new Shop();
    
    this.stream.writeVInt(0) // CallSHOP.encode(this.stream, account)

    this.stream.writeVInt(0) // AdsArray

    this.stream.writeVInt(200) // BattleTokens
    this.stream.writeVInt(0)

    this.stream.writeVInt(0)

    this.stream.writeVInt(this.account.tickets) // Tickets
    this.stream.writeVInt(0)

    this.stream.writeDataReference(16, 0)//brawlerID

    this.stream.writeString("RU")
    this.stream.writeString("t.me/projectbsfs")//authorCode

    this.stream.writeVInt(3) // IntValueArray
    this.stream.writeInt(3) 
    this.stream.writeInt(0) //tokensAnim
    this.stream.writeInt(4) 
    this.stream.writeInt(0) //trophiesAnim
    this.stream.writeInt(5) 
    this.stream.writeInt(0) //bigTokensAnim

    
    this.stream.writeVInt(2019049)

    this.stream.writeVInt(100)

    this.stream.writeVInt(10)

    this.stream.writeVInt(30)
    this.stream.writeVInt(3)

    this.stream.writeVInt(80)
    this.stream.writeVInt(10)

    this.stream.writeVInt(50)
    this.stream.writeVInt(1000)

    this.stream.writeVInt(500)
    this.stream.writeVInt(50)
    this.stream.writeVInt(999900)

    this.stream.writeVInt(0) // Array

    // const EventsInstance = new Events();
    const Eventes =[{
        reward: 20,
        slotid: 0,
        id: 7,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
      {
        reward: 20,
        slotid: 1,
        id: 14,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
      {
        reward: 20,
        slotid: 2,
        id: 0,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
      {
        reward: 20,
        slotid: 3,
        id: 24,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      }
    ]
    this.stream.writeVInt(Eventes.length+1)  // array
    for (let i = 0; i < Eventes.length+1; i++){
        this.stream.writeVInt(i)
    }

    this.stream.writeVInt(Eventes.length)
    for (const map of Eventes) {
      this.stream.writeVInt(Eventes.indexOf(map) + 1)
      this.stream.writeVInt(Eventes.indexOf(map) + 1)
      this.stream.writeBoolean(map.Ended)
      this.stream.writeVInt(map.timer) // timer

      this.stream.writeVInt(map.reward) // tokens
      this.stream.writeDataReference(15, map.id)

      this.stream.writeVInt(1)//Used

      this.stream.writeString()
      this.stream.writeVInt(0)
      this.stream.writeBoolean(false)
      this.stream.writeVInt(0)
    }

    this.stream.writeVInt(0) // Coming events array

    this.stream.writeVInt(8)
    for (const i of [20, 35, 75, 140, 290, 480, 800, 1250]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(8)
    for (const i of [1, 2, 3, 4, 5, 10, 15, 20]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(3)
    for (const i of [10, 30, 80]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(3)
    for (const i of [6, 20, 60]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(4)
    for (const i of [20, 50, 140, 280]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(4)
    for (const i of [150, 400, 1200, 2600]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(0)
    this.stream.writeVInt(200) // Max tokens
    this.stream.writeVInt(20)

    this.stream.writeVInt(8640)
    this.stream.writeVInt(10)
    this.stream.writeVInt(5)

    this.stream.writeVInt(6)

    this.stream.writeVInt(50)
    this.stream.writeVInt(604800)
    
    this.stream.writeBoolean(true)

    this.stream.writeVInt(0)//array

    this.stream.writeVInt(1)
    this.stream.writeInt(1)
    this.stream.writeInt(41000007) 


    this.stream.writeInt(0)
    this.stream.writeInt(1)

    this.stream.writeVInt(1) // NotificationID

    this.stream.writeVInt(81) // NotificationID
    this.stream.writeInt(1) // NotificattitonIndex
    this.stream.writeBoolean(false) // isSeen
    this.stream.writeInt(0) // Time ago was received
    this.stream.writeString(`BSFS V19 Started!`) // Message
    this.stream.writeVInt(0) // sentBy (0 - Tech. Support, 1 - System)

    this.stream.writeBoolean(false)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(0)
    this.stream.writeVInt(this.account.lowID)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeString(this.account.name)
    this.stream.writeVInt(this.account.name !== "BSFS V19" ? 1 : 0);


    this.stream.writeString()

    this.stream.writeVInt(8)

    this.stream.writeVInt(this.brawlers.length + 4)

    for (const brawler of this.brawlers) {
      this.stream.writeDataReference(23, brawler.cardID)
      this.stream.writeVInt(brawler.unlocked ? 1 : 0)
    }

    this.stream.writeDataReference(5, 1)
    this.stream.writeVInt(this.account.brawlBox) // Small Box tokens

    this.stream.writeDataReference(5, 8)
    this.stream.writeVInt(this.account.gold) // Gold

    this.stream.writeDataReference(5, 9)
    this.stream.writeVInt(this.account.bigBox) // Big Box tokens

    this.stream.writeDataReference(23, 0)
    this.stream.writeVInt(this.account.starpoints) // StarPoints
    this.stream.writeVInt(this.brawlers.length)
    for (const brawler of this.brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.trophies)
    }

    this.stream.writeVInt(this.brawlers.length)
    for (const brawler of this.brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.trophies)
    }

    this.stream.writeVInt(0) // UnknownArray

    this.stream.writeVInt(this.brawlers.length)
    for (const brawler of this.brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.points)
    }

    this.stream.writeVInt(this.brawlers.length)
    for (const brawler of this.brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.level)
    }

    this.stream.writeVInt(global.skills.length)
    for(let skill of global.skills){
      this.stream.writeDataReference(23, skill)
      if (this.account.skills.includes(skill)){
        this.stream.writeVInt(this.session.spg === skill ? 2 : 1)
      }else{
        this.stream.writeVInt(0)
      }
    }

    this.stream.writeVInt(0)

    this.stream.writeVInt(this.account.gems)
    this.stream.writeVInt(this.account.gems)
    this.stream.writeVInt(1)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(2)
    this.stream.writeVInt(1585502369)
  }
}

module.exports = OwnHomeDataMessage
