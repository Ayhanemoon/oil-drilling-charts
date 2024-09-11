const WebSocket = require('ws');

// Create WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3003 });

wss.on('connection', ws => {
  console.log('Client connected');
  
  // Send a test message to the client every 2 seconds
  setInterval(() => {
    ws.send(JSON.stringify({ time: new Date().toISOString(), pressure: Math.random() * 100 }));
  }, 2000);
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
