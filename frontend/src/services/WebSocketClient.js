class WebSocketClient {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketClient.instance)
      WebSocketClient.instance = new WebSocketClient();
    return WebSocketClient.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  addCallbacks = (...callbacks) => (this.callbacks = { ...callbacks });

  connect = () => {
    const path = "ws://localhost:8000/ws/matcher/";
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };

    this.socketRef.onmessage = (e) => {
      console.log(e.data);

      // this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  };

  socketNewMessage = (data) => {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  };

  state = () => this.socketRef.readyState;

  waitForSocketConnection = (callback) => {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(() => {
      if (socket.readyState === 1) {
        console.log("Connection is made");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("wait for connection...");
        recursion(callback);
      }
    }, 1);
  };

  closeConnection = () => {
    if (this.socketRef === null) {
      return;
    }
    this.socketRef.onclose = null;
    if (this.socketRef.readyState === 1 || this.socketRef.readyState === 0) {
      this.socketRef.close();
    }
  };
}

export default WebSocketClient.getInstance();
