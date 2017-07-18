const http = require('http');

// HOST:           localhost
// HTTP port:      3000
// WebSocket port: 8080

const clientScript = () => {

  const ws = new WebSocket('ws://localhost:8080/');
  ws.addEventListener('open', () => {
    ws.addEventListener('message', (message) => {
      const t = document.createTextNode(message.data);
      const p = document.createElement('p');
      p.appendChild(t);
      document.querySelector('#out').appendChild(p);
    });
    ws.addEventListener('close', () => {
      const t = document.createTextNode('WebSocketの接続が切断しました。');
      const p = document.createElement('p');
      p.appendChild(t);
      document.querySelector('#out').appendChild(p);
    });
    ws.addEventListener('error', (event) => {
      const t = document.createTextNode('エラーが発生しました。');
      const p = document.createElement('p');
      p.appendChild(t);
      document.querySelector('#out').appendChild(p);
      console.error(event);
    });


  });

  window.addEventListener('load', () => {
    document.querySelector('#send').addEventListener('click', () => {
      ws.send(document.querySelector('#msg').value);
    });
  });
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"  >
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WebSocket のテスト</title>
  <!--  Font Awesome の CDN  -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <style>
  body {
    padding: 20px;
  }
  p {
    margin: 5px;
  }
  input[type='text'] {
    padding-left: 3px;
    padding-right: 3px;
  }
  output {
    margin-top: 10px;
  }
  footer {
    text-align: right;
  }
  </style>
  <script type="text/javascript">
    ( ${clientScript} )();
  </script>
  </head>
  <body>
    <header>
      <h1>WebSocket のテスト</h1>
    </header>
    <hr>

    <div class="panel panel-info">
      <div class="panel-heading">動作説明</div>
      <div class="panel-body">
        <ul>
          <li>「WebSocketサーバーに送る」ボタンを押すと、入力した文字列を WebSocket サーバーに向けて送信します。</li>
          <li>WebSocket サーバーは、クライアントからメッセージを受け取ったら、「次のメッセージを受け取りました： {受け取ったメッセージ}」という文字列をクライアントに返してきます。</li>
          <li>クライアントでは WebSocketサーバーが送ってきたメッセージを、「サーバーからのメッセージ」の下に表示していきます。</li>
          <li>WebSocketの通信は継続されたままになっています。</li>
        </ul>
      </div>
    </div>

    <input type="text" id="msg" value="こんにちは！" /><button id="send">WebSocketサーバーに送る</button>

    <output>
    <div class="panel panel-default">
      <div class="panel-heading">サーバーからのメッセージ</div>
      <div class="panel-body" id="out">
      </div>
    </div>
    </output>

    <div class="well">
      <h4>ソースコード</h4>
      <ul>
        <li><a href="https://github.com/laboradian/websocket-server-sample001">laboradian/websocket-server-sample001</a></li>
      </ul>

      <h4>利用した npmパッケージ</h4>
      <ul>
        <li><a href="https://github.com/websockets/ws">websockets/ws: Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js</a></li>
      </ul>

      <h4>参考</h4>
      <ul>
        <li><a href="https://tools.ietf.org/html/rfc6455">RFC 6455 - The WebSocket Protocol</a></li>
        <li><a href="https://www.w3.org/TR/websockets/">The WebSocket API</a></li>
        <li><a href="https://developer.mozilla.org/ja/docs/Web/API/WebSockets_API">WebSockets - Web API インターフェイス | MDN</a></li>
        <li><a href="http://jxck.hatenablog.com/entry/20120725/1343174392">WebSocket サーバの実装とプロトコル解説 - Block Rockin’ Codes</a></li>
      </ul>

    </div>
    <hr>
    <footer>© 2017 <a href="http://laboradian.com/">Laboradian</a></footer>
  </body>
  <html>`;
  res.end(html);
});

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({
	host : '0.0.0.0',
	port : 8080
});
wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		ws.send(`次のメッセージを受け取りました： ${message}`);
	});
});

server.listen(3000);