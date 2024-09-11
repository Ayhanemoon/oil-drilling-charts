class WebSocketHandler {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.listeners = [];
  }

  connect() {
    this.ws = new WebSocket(this.url); // This is the native WebSocket constructor
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);  // Assume WebSocket sends JSON
      this.listeners.forEach(callback => callback(data));  // Notify all listeners
    };
  }

  onData(callback) {
    this.listeners.push(callback);  // Add listeners to handle incoming data
  }
}

export default WebSocketHandler;
