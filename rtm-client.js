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

// Logout
function leaveChannel() {
    client.logout()
}