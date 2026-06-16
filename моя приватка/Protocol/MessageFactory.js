const fs = require('fs');
const path = require('path');
const glob = require('glob');

const getDirectories = (src, callback) => glob(src + '/**/*.js', callback);

class MessageFactory {
  constructor(useLegacyPacketLoader = false) {
    this.packets = {};

    const messagesDir = path.join(__dirname, 'Messages');

    if (!useLegacyPacketLoader) {
      getDirectories(messagesDir, (err, files) => {
        if (err) {
          console.error('Error reading messages directory:', err);
          return;
        }

        for (const file of files) {
          try {
            const relativePath = path.relative(__dirname, file).replace(/\\/g, '/');
            const Packet = require('./' + relativePath);
            const packetInstance = new Packet();

            if (packetInstance.id !== undefined) {
              this.packets[packetInstance.id] = Packet;
            } else {
              console.warn(`Packet ${relativePath} has no 'id' property!`);
            }
          } catch (err) {
            console.error(`Failed to load packet "${file}":`, err.message);
          }
        }
      });
    } else {
      const clientDir = path.join(messagesDir, 'Client');
      fs.readdir(clientDir, (err, files) => {
        if (err) {
          console.error('Error reading Client directory:', err);
          return;
        }
        files
          .filter(file => file.endsWith('.js'))
          .forEach(file => {
            try {
              const Packet = require(`./Messages/Client/${file.replace('.js', '')}`);
              const packetInstance = new Packet();
              this.packets[packetInstance.id] = Packet;
            } catch (err) {
              console.error(`Failed to load legacy packet "${file}":`, err.message);
            }
          });
      });
    }
  }

  getAllPackets() {
    return this.packets;
  }
}

module.exports = MessageFactory;