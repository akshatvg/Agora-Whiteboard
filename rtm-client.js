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
            $("#sendMsgBtn").click(function () {
                singleMessage = $('#channelMsg').val();
                channel.sendMessage({ text: singleMessage }).then(() => {
                    console.log("Message sent successfully.");
                    console.log("Your message was: " + singleMessage + " by " + accountName);
                    $("#messageBox").append("<br> Sender: " + accountName + "<br> Message: " + singleMessage + "<br>");
                }).catch(error => {
                    console.log("Message wasn't sent due to an error: ", error);
                });

                // Receive Channel Message
                channel.on('ChannelMessage', ({ text }, senderId) => {
                    console.log("Message received successfully.");
                    console.log("The message is: " + text + " by " + senderId);
                    $("#messageBox").append("<br> Sender: " + senderId + "<br> Message: " + text + "<br>");
                });
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