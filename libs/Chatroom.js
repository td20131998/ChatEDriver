module.exports = function (room_name,room_image) {
    const roomName =room_name;
    const roomImage =room_image;
    const members = new Map()
    var chatHistory = []

    function broadcastMessage(message,io) {
        io.sockets.in(roomName).emit('message',message);
        addEntry([message]);
    }

    function addEntry(entry) {
        chatHistory = chatHistory.concat(entry)
    }

    function getChatHistory() {
        return chatHistory.slice()
    }

    function addUser(client) {
        members.set(client.id, client)
    }

    function removeUser(client) {
        members.delete(client.id)
    }

    function serialize() {
        return {
            room_name,
            image,
            numMembers: members.size
        }
    }

    return {
        broadcastMessage,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
        serialize
    }
}