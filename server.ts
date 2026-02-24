import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", (ws) => {
  console.log("새 클라이언트 접속!");

  ws.on("message", (message) => {
    console.log(`받은 메시지: ${message}`);

    // 모든 클라이언트에게 브로드캐스트
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });
});

console.log("WebSocket 서버 실행 중: ws://localhost:4000");