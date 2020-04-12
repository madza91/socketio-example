/**
 * client.js
 */
(function() {
    let main = {
        socketServer: 'https://localhost:8080',
        socket: null,
        button: null,
        panel: null,
        input: null,
        init: function () {
            this.button = document.getElementById("send");
            this.input = document.getElementById("msg");
            this.panel = document.getElementById("panel");
            this.button.addEventListener("click", function(){
                this.sendMessageToServer();
            }.bind(this));
            this.createSocket();
            this.listenFromServer();
        },
        createSocket: function () {
            this.socket = io(this.socketServer, {
                rejectUnauthorized: false,
                secure: true
            });
        },
        listenFromServer: function (msg) {
            this.socket.on("message", (function(msg){
                this.updateList(msg);
            }).bind(this))
        },
        sendMessageToServer: function () {
            this.updateList('client: ' + this.input.value);
            this.socket.emit("message", this.input.value);
        },
        updateList: function (msg) {
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(msg));
            this.panel.append(p);
        }
    };

    main.init();
})();
