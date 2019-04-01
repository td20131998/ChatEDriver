var senderNickname;
var hotname = '<%= hostname %>';
var user = {};
$(function () {
    var el_users = $('#users');
    $('#loginBtn').click(function () {

        senderNickname = $('#username').val();
        $.ajax({
            url: hotname+'login',
            type: 'POST',
            data: {username:senderNickname,'password':senderNickname},
            dataType:'json',
            success:function (response) {
                if(response.status == 1){
                    user = response.data.user;

                    $('#login').hide();
                    $('#chat').show();
                    $('#my-account').html(senderNickname);
                    var socket = io.connect(hotname);
                    el_users.on('click','li',function () {
                        var username = $(this).data('username');
                        var room_name = [username,senderNickname].sort().join('_');
                        chatRoomManager.add(room_name,username,socket)
                        socket.emit("createroom", {sender:senderNickname,receive:username});
                    })

                    socket.emit("join", senderNickname);

                    socket.on("message", function(msg){
                        chatBox.displayMessage(msg);
                    });

                    socket.on('updaterooms',function(msg){
                        var final_message = $("<p />").text(msg.senderNickname+': '+ msg.message);
                        /*$("#history").append(final_message);
                        final_message.scrollintoview();*/
                    })
                    socket.on('updatechat',function(msg){
                        var final_message = $("<p />").text(msg.senderNickname+': '+ msg.message);
                        $("#history").append(final_message);
                        final_message.scrollintoview();
                    })
                    socket.on('userdisconnect',function(msg){
                        var final_message = $("<p />").text(msg.senderNickname+': '+ msg.message);
                        $("#history").append(final_message);
                        final_message.scrollintoview();
                    })

                    socket.on('userOnline',function (key) {
                        var room_name = [key,senderNickname].sort().join('_');
                        if(el_users.find('li[data-room-name='+room_name+']').length<1){
                            el_users.append('<li data-room-name='+room_name+' data-username="'+key+'">'+key+'<span class="count-message" data-count="0"></span></li>');
                        }
                    });

                    socket.on('listuser',function (msg) {
                        for(var key in msg.users){
                            el_users.append('<li data-room-name='+([key,senderNickname]).sort().join('_')+' data-username="'+key+'">'+key+'<span class="count-message" data-count="0"></span></li>');
                        }
                    });
                }
            }
        })
    })

})

var chatRoomManager = (function() {
    var rooms ={};
    var el_chatRoomContainer = $('#chat-rooms-container');
    return {
        add: function (room_name,receiver_id,socket) {
            if(el_chatRoomContainer.find('#room_'+room_name).length==0){
                el_chatRoomContainer.append('<div class="chatbox" id="room_'+room_name+'"><div class="room_title" id="room_title">'+receiver_id+'</div><div class="messages" id="messages_'+room_name+'"></div><input data-id="'+room_name+'"  class="message" id="message_'+room_name+'" type="text" value=""><input data-id="'+room_name+'" class="bttn-send" type="button" id="btn_'+room_name+'" value="Gửi"></div>');
                chatBox.add(room_name,receiver_id,socket);
            }else{
                //do stuff
            }
        }
    }
})();

var chatBox = (function () {
    var chats = new Map();
    var getChatBox = function (id) {
        return chats.get(id);
    }
    var removeChatBox = function (id) {
        var chatBox = getChatBox(id);
        chatBox.el_room.remove();
        chats.delete(id);

    }
    var handSendMessage= function (cb) {
        var msg = $('#message_'+cb.room_name).val();
        $('#message_'+cb.room_name).val("");
        cb.socket.emit("messagedetection",senderNickname,cb.receiver_id,cb.room_name,msg, function() {
            cb.el_messge.val("");
        });
    };
    return{
        add: function (room_name,receiver_id,socket) {
            var chat = {
                room_name:room_name,
                receiver_id:receiver_id,
                messages: [],
                el_room: $('#room_'+room_name),
                el_messges: $('#messages_'+room_name),
                el_messge: $('#message_'+room_name),
                el_btn: $('#btn_'+room_name),
                socket: socket,
            };
            chat.el_btn.unbind('click');
            chat.el_btn.click(function () {
                var id = $(this).attr('data-id');
                var cb= getChatBox(id);
                handSendMessage(cb);

            })
            chats.set(room_name,chat);;
        },
        displayMessage: function(msg){
            var chatbox = getChatBox(msg.room_name);
            if(chatbox){
                var el_ms =null;
                if(msg.histories !== undefined){
                    for(var i=0;i<msg.histories.length;i++){
                        var msg_old = msg.histories[i];
                        el_ms =$("<p />").text(msg_old.sender+': '+ msg_old.message);
                        chatbox.el_messges.append(el_ms);
                    }
                }else{
                    el_ms = $("<p />").text(msg.sender+': '+ msg.message);
                    chatbox.el_messges.append(el_ms);
                }
                if(chatbox!=null){
                    el_ms.scrollintoview();
                }

            }else{
                var el_count= $('#users').find('li[data-room-name='+msg.room_name+'] .count-message');
                var cnt = parseInt(el_count.attr('data-count'));
                cnt+=1;
                el_count.html('('+cnt+')').attr('data-count',cnt);
            }
        }
    }
})()
