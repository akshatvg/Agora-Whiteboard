// Constants
var singleMessage = "test peer message";
var agoraAppId = "a6af85f840ef43108491705e2315a857";
var isLoggedIn = false;

// Auto Init MaterializeCSS
M.AutoInit();

// RtmClient
const client = AgoraRTM.createInstance(agoraAppId, { enableLogUpload: false });

// Login
client.login({ uid: 'fsc' }).then(() => {
    console.log('AgoraRTM client login success');
    isLoggedIn = true;
    // Channel Join
    $("#joinChannelBtn").click(function () {
        var channelName = $('#channelNameInput').val();
        const channel = client.createChannel(channelName);
        channel.join().then(() => {
            console.log('AgoraRTM client channel join success.');
            // Close Channel Join Modal
            $("#joinChannelModal").modal('close');
        }).catch(error => {
            console.log('AgoraRTM client channel join failed.');
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

// Send Channel Message
channel.sendMessage({ text: 'test channel message' }).then(() => {
    /* Your code for handling events, such as a channel message-send success. */
}).catch(error => {
    /* Your code for handling events, such as a channel message-send failure. */
});

// Receive Channel Message
channel.on('ChannelMessage', ({ text }, senderId) => { // text: text of the received channel message; senderId: user ID of the sender.
    /* Your code for handling events, such as receiving a channel message. */
});

// Logout
function leaveChannel() {
    channel.leave();
    client.logout()
}