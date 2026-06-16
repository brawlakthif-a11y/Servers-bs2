const fs = require('fs');
const path = require('path');

class CommandManager {
  constructor() {
    this.commands = {};

    const baseDir = './Protocol/Commands';
    const subDirs = ['Client', 'Server'];

    subDirs.forEach(subDir => {
      const dirPath = path.join(baseDir, subDir);
      try {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          if (!file.endsWith('.js')) return;

          const Command = require(path.join('../Protocol/Commands', subDir, file.replace('.js', '')));
          const commandClass = new Command();

          this.commands[commandClass.commandID] = Command;
        });
      } catch (err) {
        console.error(`Error when reading directory ${dirPath}:`, err);
      }
    });
  }

  handle(id) {
    return this.commands[id];
  }

  getCommands() {
    return Object.keys(this.commands);
  }
}

module.exports = CommandManager;