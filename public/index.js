/**
 * Created by suransh on 10/10/16.
 */

var socket = io();
var username;


$.get('/showchats', (rows) => {
    var data = "";
    for (var i = 1;i<rows.length;i++) data += '<li class="list-group-item">' + rows[i].msg + '</li>';
    $('#list').append(data);
    $("#list").animate({ scrollTop: $('#list').prop("scrollHeight")}, 1000);
});

$ ( function () {

    $("#list").animate({ scrollTop: $('#list').prop("scrollHeight")}, 1000);
    $('#send').click( ()=> {
        var msg = $('#msg').val();
        var name = $('#name').val();
        if (name=='') {alert('Please Enter Your Name'); return }
        socket.emit('chat',name + ' : ' + msg);
        $('#msg').val('');
        $.post('/addmsg', {
            msg: name + ' : ' + msg
            }
        );
    } );
    socket.on('chat', (data) => {
        $('#list').append('<li class="list-group-item">' + data + '</li>');
        $("#list").animate({ scrollTop: $('#list').prop("scrollHeight")}, 1000);
    })
});
