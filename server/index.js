var io =  require("socket.io")(process.env.PORT||3000,function () {
    console.log("Start server");
});
var arrPeerID =[];
io.on("connection",function (socket) {
    console.log(socket.id);
    socket.emit("Online-Peer",arrPeerID);
    socket.on("New-peer-id",function (peerID) {
        socket.idPeer= peerID;
        arrPeerID.push(peerID);
        io.emit("New_Client_Connect",peerID);
    })
    socket.on("disconnect",function () {
        var index  = arrPeerID.indexOf(socket.idPeer);
        arrPeerID.splice(index,1);
        io.emit("Someone_Disconnected",socket.idPeer);
    })
})