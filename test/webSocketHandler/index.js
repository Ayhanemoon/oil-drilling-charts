class WebSocketHandler {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.listeners = [];
  }

  connect() {
    this.ws = new WebSocket(this.url);  // Native WebSocket API
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach(callback => callback(data));
    };
  }

  onData(callback) {
    this.listeners.push(callback);
  }
}

export default WebSocketHandler;
