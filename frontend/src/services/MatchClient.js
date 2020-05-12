import store from "../store";

class MatchClient {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!MatchClient.instance) MatchClient.instance = new MatchClient();
    return MatchClient.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  addCallback(callbacks) {
    this.callbacks = callbacks;
  }

  fetchMessages(match_id) {
    this.sendMessage({ command: "fetch_messages", match_id: match_id });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      match_id: message.match_id,
      text: message.text,
    });
  }

  sendMessage(data) {
    console.log("sendMessage ", JSON.stringify({ ...data }));

    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  connect = () => {
    const token = store.getState().getIn(["auth", "token"], null);
    if (token) {
      const path =
        document.location.origin.replace(/^http/, "ws") + "/ws/?token=" + token;
      this.socketRef = new WebSocket(path);
      this.socketRef.onopen = () => {
        console.log("WebSocket open");
      };

      this.socketRef.onmessage = (e) => {
        console.log("sadfsadfsadfsadf");

        console.log(e.data);
        this.socketNewMessage(e.data);
      };

      this.socketRef.onerror = (e) => {
        console.log(e.message);
      };

      this.socketRef.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.connect();
      };
      return true;
    } else {
      return false;
    }
  };

  socketNewMessage = (data) => {
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    const parsedData = JSON.parse(data);
    console.log("socketNewMessage", data);
    const command = parsedData.command;
    console.log(parsedData);

    if (command === "messages") {
      this.callbacks[command](parsedData.match_id, parsedData.);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData);
    }
    if (command === "match_created") {
      this.callbacks[command]();
    }
    if (command === "match_terminated") {
      this.callbacks[command]();
    }
  };

  state = () => this.socketRef.readyState;

  waitForSocketConnection = (callback) => {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(() => {
      if (socket.readyState === 1) {
        // console.log("Connection is made");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        // console.log("wait for connection...");
        recursion(callback);
      }
    }, 1);
  };

  closeConnection = () => {
    if (this.socketRef === null) {
      return;
    }
    this.socketRef.onclose = () => {
      // console.log("closing connection - closeConnection()");
    };
    if (this.socketRef.readyState === 1 || this.socketRef.readyState === 0) {
      this.socketRef.close();
    }
  };
}

export default MatchClient.getInstance();
