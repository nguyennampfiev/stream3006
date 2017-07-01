var Peer = require("peerjs");
var uid = require("uid");
var $ =require("jquery");
var open = require("./getStream");
var  playVideo =require("./playVideo");
var io =require("socket.io-client");
var socket =io("http://localhost:3000");
var config = {host:"stream3006.herokuapp.com",port:443,secure:true};
function getPeer() {
    var id=uid(10);
    $("#peer-id").append(id);
    return id;
}
var peerID = getPeer();
socket.emit("New-peer-id",peerID);
var peer = new Peer(peerID,config);
$("#btnCall").click(function () {
    var friendid =$('#txtFriend-id').val();
    open(function (stream) {
        playVideo(stream,"localStream");
        console.log(friendid);
        var call = peer.call(friendid, stream);
        console.log("call  :"+call);
        console.log("here");
        call.on("stream",function (remoteStream) {
            playVideo(remoteStream,"friendStream");
        }),function (err) {
            console.log(err);
        }
    })
})
peer.on("call",function (call) {
    open(function (Fstream) {
        playVideo(Fstream,"localStream");
        call.answer(Fstream);
        call.on("stream",function (remoteStream) {
            playVideo(remoteStream,"friendStream");
        }),function (err) {
            console.log(err);
        }
    })
});
socket.on("Online-Peer",function (arr) {
 arr.forEach(function (PeerID) {
     console.log(PeerID);
     $("#ulPeerID").append(`<li id="${PeerID}">${PeerID}</li>`);

 })
})
socket.on("New_Client_Connect",function (PeerID) {

    $("#ulPeerID").append(`<li id="${PeerID}">${PeerID}</li>`);
})
socket.on("Someone_Disconnected",function (PeerID) {
    $(`#${PeerID}`).remove();

})
$("#ulPeerID").on('click','li',function () {
    var peerid = $(this).text();
    open(function (stream) {
        playVideo(stream,"localStream");
        var call = peer.call(peerid, stream);
        console.log("call  :"+call);
        console.log("here");
        call.on("stream",function (remoteStream) {
            playVideo(remoteStream,"friendStream");
        }),function (err) {
            console.log(err);
        }
    })
})

console.log(peer);



