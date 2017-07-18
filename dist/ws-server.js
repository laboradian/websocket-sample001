'use strict';

var http = require('http');

// HOST:           localhost
// HTTP port:      3000
// WebSocket port: 8080

var clientScript = function clientScript() {

  var ws = new WebSocket('ws://localhost:8080/');
  ws.addEventListener('open', function () {
    ws.addEventListener('message', function (message) {
      var t = document.createTextNode(message.data);
      var p = document.createElement('p');
      p.appendChild(t);
      document.querySelector('#out').appendChild(p);
    });
    ws.addEventListener('close', function () {
      var t = document.createTextNode('WebSocketの接続が切断しました。');
      var p = document.createElement('p');
      p.appendChild(t);
      document.querySelector('#out').appendChild(p);
    });
    ws.addEventListener('error', function (event) {
      var t = document.createTextNode('エラーが発生しました。');
      var p = document.createElement('p');
      p.appendChild(t);
      document.querySelector('#out').appendChild(p);
      console.error(event);
    });
  });

  window.addEventListener('load', function () {
    document.querySelector('#send').addEventListener('click', function () {
      ws.send(document.querySelector('#msg').value);
    });
  });
};

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  var html = '<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge"  >\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>WebSocket \u306E\u30C6\u30B9\u30C8</title>\n  <!--  Font Awesome \u306E CDN  -->\n  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\n  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">\n  <style>\n  body {\n    padding: 20px;\n  }\n  p {\n    margin: 5px;\n  }\n  input[type=\'text\'] {\n    padding-left: 3px;\n    padding-right: 3px;\n  }\n  output {\n    margin-top: 10px;\n  }\n  footer {\n    text-align: right;\n  }\n  </style>\n  <script type="text/javascript">\n    ( ' + clientScript + ' )();\n  </script>\n  </head>\n  <body>\n    <header>\n      <h1>WebSocket \u306E\u30C6\u30B9\u30C8</h1>\n    </header>\n    <hr>\n\n    <div class="panel panel-info">\n      <div class="panel-heading">\u52D5\u4F5C\u8AAC\u660E</div>\n      <div class="panel-body">\n        <ul>\n          <li>\u300CWebSocket\u30B5\u30FC\u30D0\u30FC\u306B\u9001\u308B\u300D\u30DC\u30BF\u30F3\u3092\u62BC\u3059\u3068\u3001\u5165\u529B\u3057\u305F\u6587\u5B57\u5217\u3092 WebSocket \u30B5\u30FC\u30D0\u30FC\u306B\u5411\u3051\u3066\u9001\u4FE1\u3057\u307E\u3059\u3002</li>\n          <li>WebSocket \u30B5\u30FC\u30D0\u30FC\u306F\u3001\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u304B\u3089\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u53D7\u3051\u53D6\u3063\u305F\u3089\u3001\u300C\u6B21\u306E\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\uFF1A {\u53D7\u3051\u53D6\u3063\u305F\u30E1\u30C3\u30BB\u30FC\u30B8}\u300D\u3068\u3044\u3046\u6587\u5B57\u5217\u3092\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u306B\u8FD4\u3057\u3066\u304D\u307E\u3059\u3002</li>\n          <li>\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u3067\u306F WebSocket\u30B5\u30FC\u30D0\u30FC\u304C\u9001\u3063\u3066\u304D\u305F\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u3001\u300C\u30B5\u30FC\u30D0\u30FC\u304B\u3089\u306E\u30E1\u30C3\u30BB\u30FC\u30B8\u300D\u306E\u4E0B\u306B\u8868\u793A\u3057\u3066\u3044\u304D\u307E\u3059\u3002</li>\n          <li>WebSocket\u306E\u901A\u4FE1\u306F\u7D99\u7D9A\u3055\u308C\u305F\u307E\u307E\u306B\u306A\u3063\u3066\u3044\u307E\u3059\u3002</li>\n        </ul>\n      </div>\n    </div>\n\n    <input type="text" id="msg" value="\u3053\u3093\u306B\u3061\u306F\uFF01" /><button id="send">WebSocket\u30B5\u30FC\u30D0\u30FC\u306B\u9001\u308B</button>\n\n    <output>\n    <div class="panel panel-default">\n      <div class="panel-heading">\u30B5\u30FC\u30D0\u30FC\u304B\u3089\u306E\u30E1\u30C3\u30BB\u30FC\u30B8</div>\n      <div class="panel-body" id="out">\n      </div>\n    </div>\n    </output>\n\n    <div class="well">\n      <h4>\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9</h4>\n      <ul>\n        <li><a href="https://github.com/laboradian/websocket-server-sample001">laboradian/websocket-server-sample001</a></li>\n      </ul>\n\n      <h4>\u5229\u7528\u3057\u305F npm\u30D1\u30C3\u30B1\u30FC\u30B8</h4>\n      <ul>\n        <li><a href="https://github.com/websockets/ws">websockets/ws: Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js</a></li>\n      </ul>\n\n      <h4>\u53C2\u8003</h4>\n      <ul>\n        <li><a href="https://tools.ietf.org/html/rfc6455">RFC 6455 - The WebSocket Protocol</a></li>\n        <li><a href="https://www.w3.org/TR/websockets/">The WebSocket API</a></li>\n        <li><a href="https://developer.mozilla.org/ja/docs/Web/API/WebSockets_API">WebSockets - Web API \u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30A4\u30B9 | MDN</a></li>\n        <li><a href="http://jxck.hatenablog.com/entry/20120725/1343174392">WebSocket \u30B5\u30FC\u30D0\u306E\u5B9F\u88C5\u3068\u30D7\u30ED\u30C8\u30B3\u30EB\u89E3\u8AAC - Block Rockin\u2019 Codes</a></li>\n      </ul>\n\n    </div>\n    <hr>\n    <footer>\xA9 2017 <a href="http://laboradian.com/">Laboradian</a></footer>\n  </body>\n  <html>';
  res.end(html);
});

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  host: '0.0.0.0',
  port: 8080
});
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    ws.send('\u6B21\u306E\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\uFF1A ' + message);
  });
});

server.listen(3000);
