let socket;
let userId = document.getElementById("id");
let button = document.getElementById("connect");

const textboxarea = document.getElementById("textboxarea");
textboxarea.addEventListener("keyup", (e) => {
    socket.send(JSON.stringify(e.target.value));
});
button.addEventListener("click", (e) => {
    console.log("clicked");
    socket = new WebSocket("ws://127.0.0.1:3001");
    socket.onopen = function () {
        console.log("connection opened");
    };
    socket.onerror = function (err) {
        console.log(err);
    };
    socket.onmessage = function (e) {
        // console.log(JSON.parse(e.data));
        textboxarea.value = JSON.parse(e.data);
    };
});
