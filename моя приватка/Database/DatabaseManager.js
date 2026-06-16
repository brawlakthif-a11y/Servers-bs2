const fs = require('fs');
const path = require('path');

// Папка для хранения данных
const dataDir = path.join(__dirname, 'database_data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const accountsDir = path.join(dataDir, 'accounts');
if (!fs.existsSync(accountsDir)) fs.mkdirSync(accountsDir);

// Вспомогательные функции
const saveAcc = (lowID, data) => fs.writeFileSync(path.join(accountsDir, `${lowID}.json`), JSON.stringify(data, null, 2));
const readAcc = (lowID) => JSON.parse(fs.readFileSync(path.join(accountsDir, `${lowID}.json`), 'utf8'));

module.exports = {
    async createAccount(token) {
        const lowID = Math.floor(Math.random() * 900000) + 100000; // Случайный ID
        
        const account = {
            lowID: lowID,
            token: token,
            name: "Player",
            gold: 0,
            gems: 0,
            trophies: 0,
            highestTrophies: 0,
            experience: 0,
            brawlers: [ // Только стартовый персонаж (Шелли)
                {
                    id: 0, 
                    cardID: 0, 
                    unlocked: true, 
                    level: 1, 
                    points: 0, 
                    trophies: 0 
                }
            ],
            clubId: 0,
            friends: []
        };

        saveAcc(lowID, account);
        fs.writeFileSync(path.join(dataDir, `token_${token}.json`), JSON.stringify({ lowID }));
        return account;
    },

    async getAccount(lowID) {
        try { return readAcc(lowID); } catch { return null; }
    },

    async getAccountToken(token) {
        try {
            const tokenPath = path.join(dataDir, `token_${token}.json`);
            if (!fs.existsSync(tokenPath)) return null;
            const data = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
            return await this.getAccount(data.lowID);
        } catch { return null; }
    },

    async replaceValue(lowID, valueName, newValue) {
        try {
            const acc = readAcc(lowID);
            acc[valueName] = newValue;
            saveAcc(lowID, acc);
        } catch (e) { console.error("Error updating value:", e); }
    }
};