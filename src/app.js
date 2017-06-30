var Peer = require("peerjs");
var uid = require("uid");
var $ =require("jquery");
var open = require("./getStream");
var  playVideo =require("./playVideo");
var config = {host:"stream3006.herokuapp.com",port:443,secure:true};
function getPeer() {
    var id=uid(10);
    $("#peer-id").append(id);
    return id;
}
var peer = new Peer(getPeer(),config);
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
    console.log('123123123');
    open(function (Fstream) {
        console.log('123123123');
        playVideo(Fstream,"localStream");
        call.answer(Fstream);
        call.on("stream",function (remoteStream) {
            playVideo(remoteStream,"friendStream");
        }),function (err) {
            console.log(err);
        }
    })
})
console.log(peer);



