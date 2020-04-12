# SocketIO example with SSL

This is simple example with Socket Server (Node) and Client (vanilla js) for both secure and non secure connection.

## Installation

### Server
- `npm install`
- Generate SSL certs if you don't have it already
- Change server configuration values in `server.js` (ports and certification files for ssl)
- Enable ports on your (Ubuntu) server `sudo ufw allow 8080`
- `npm start` or `node start.js`

### Client
- Change `socketServer` in `client.js`