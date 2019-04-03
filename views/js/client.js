$('head').append('<link rel="stylesheet" href="http://localhost:3000/public/css/style.css" type="text/css" />');
document.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollintoview/1.8/jquery.scrollintoview.js"></script>');
document.write('<script type="text/javascript" src="http://localhost:3000/socket.io/socket.io.js"></script>');
document.write('<script type="text/javascript" src="http://localhost:3000/js/administrator.js?callback=<%= fnCallback %>"></script>');