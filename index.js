// Color Variable
var color;

// Set up the canvas
var canvas = document.getElementById("whiteboard-canvas");
var dpr = window.devicePixelRatio || 1;
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth * dpr;
ctx.canvas.height = window.innerHeight * dpr;
ctx.strokeStyle = color;
ctx.lineWith = 3;

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Draw to the canvas
function renderCanvas() {
    if (drawing) {
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
        ctx.closePath();
    }
}

// Allow for animation
(function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
})();

// Clear the canvas
function clearCanvas() {
    canvas.width = canvas.width;
    console.log("Cleared Canvas.");
}

// Color picker stroke color
function changeColor() {
    color = "#000000";
    ctx.strokeStyle = color;
    document.getElementById("colorPicker").value = "#000000";
    ctx.lineWidth = 3;
    document.getElementById("colorPicker").click();
    document.getElementById("colorPicker").onchange = function () {
        color = this.value;
        console.log("Color changed to:" + color);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
    }
}

// Eraser
function startErasing() {
    color = this.value;
    console.log("Erasing.");
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 50;
}

// Set up mouse events for drawing
var drawing = false;
var x, y;
var mousePos = { x: x, y: y };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
    canvas.addEventListener("mousemove", function (e) {
        mousePos = getMousePos(canvas, e);
    }, false);
}, false);
canvas.addEventListener("mouseup", function (e) {
    drawing = false;
}, false);

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);

var dataUrl = canvas.toDataURL();

// Constants
var agoraAppId = "a6af85f840ef43108491705e2315a857";
var isLoggedIn = false;

// Auto Init MaterializeCSS
M.AutoInit();

// RtmClient
const client = AgoraRTM.createInstance(agoraAppId, { enableLogUpload: false });

// Form Click Event
$("#joinChannelBtn").click(function () {
    var accountName = $('#accountName').val();

    // Login
    client.login({ uid: accountName }).then(() => {
        console.log('AgoraRTM client login success. Username: ' + accountName);
        isLoggedIn = true;

        // Channel Join
        var channelName = $('#channelNameInput').val();
        channel = client.createChannel(channelName);
        channel.join().then(() => {
            console.log('AgoraRTM client channel join success.');
            $("#joinChannelBtn").prop("disabled", true);

            // Close Channel Join Modal
            $("#joinChannelModal").modal('close');

            // Send Channel Message
            // Mouse Down
            canvas.addEventListener("mousedown", function () {
                // Mouse Move
                canvas.addEventListener("mousemove", function () {
                    drawing = true;
                    var lastPosNow = { x: lastPos.x, y: lastPos.y };
                    var mousePosNow = { x: mousePos.x, y: mousePos.y };
                    finalPos = { lastPosNow: lastPosNow, mousePosNow: mousePosNow };
                    // Final Coordinates
                    // console.log(finalPos);
                    msg = { description: 'Coordinates where drawing is taking place.', messageType: 'TEXT', rawMessage: undefined, text: JSON.stringify(finalPos) }
                    channel.sendMessage(msg).then(() => {
                        console.log("Your message was: " + JSON.stringify(finalPos) + " by " + accountName);
                    }).catch(error => {
                        console.log("Message wasn't sent due to an error: ", error);
                    });
                });
                // Mouse Up
                canvas.addEventListener("mouseup", function () {
                    drawing = false;
                });
            });

            // Receive Channel Message
            channel.on('ChannelMessage', ({ text }, senderId) => {
                console.log("The message is: " + text + " by " + senderId);
                parsedCoordinates = JSON.parse(text);
                // Parsed Coordinates
                // console.log(parsedCoordinates);
                drawing = true;
                if (drawing) {
                    console.log("Drawing for others.");
                    ctx.beginPath();
                    ctx.moveTo(parsedCoordinates.lastPosNow.x, parsedCoordinates.lastPosNow.y);
                    ctx.lineTo(parsedCoordinates.mousePosNow.x, parsedCoordinates.mousePosNow.y);
                    ctx.stroke();
                    parsedCoordinates.lastPosNow = parsedCoordinates.mousePosNow;
                    ctx.closePath();
                }
            });

        }).catch(error => {
            console.log('AgoraRTM client channel join failed: ', error);
        }).catch(err => {
            console.log('AgoraRTM client login failure: ', err);
        });
    });
});

// Show Form on Page Load
$(document).ready(function () {
    $('#joinChannelModal').modal();
    $("#joinChannelModal").modal('open');
});

// Logout
function leaveChannel() {
    channel.leave();
    client.logout();
    isLoggedIn = false;
    $("#joinChannelBtn").prop("disabled", false);
    $("#joinChannelModal").modal('open');
    console.log("Channel left successfully and user has been logged out.");
}