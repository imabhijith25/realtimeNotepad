let socket;
let userId = document.getElementById("id");
let button = document.getElementById("connect");

const textboxarea = document.getElementById("textboxarea");

const debounce = function (fnc, timeout = 300) {
    let timer;
    return (...args) => {
        console.log(args);
        clearTimeout(timer);
        timer = setTimeout(() => {
            fnc(args[0]);
        }, timeout);
    };
};
// const fnc = () => {
//     console.log("hii");
// };
// const returned = debounce(fnc);

const delayedSending = (val) => {
    console.log("sending");
    socket.send(JSON.stringify(val));
};
const delay = debounce(delayedSending);
textboxarea.addEventListener("keyup", (e) => {
    // socket.send(JSON.stringify(e.target.value));
    delay(e.target.value);
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
