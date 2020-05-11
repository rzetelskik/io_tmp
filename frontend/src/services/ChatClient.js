import store from "../store";

class ChatClient {
  static instance = null;
  callbacks = {};

  static getInstance(chatId) {
    if (!ChatClient.instance || ChatClient.instance.chatId !== chatId) {
      console.log("fasfdsafdsadfsafdsafd");

      ChatClient.instance = new ChatClient(chatId);
    }
    return ChatClient.instance;
  }

  constructor(chatId) {
    this.socketRef = null;
    this.chatId = chatId;
  }

  addCallback(acceptNotificationCallback) {
    this.callbacks["accept"] = acceptNotificationCallback;
  }

  connect = () => {
    const token = store.getState().getIn(["auth", "token"], null);
    if (token) {
      const path =
        document.location.origin.replace(/^http/, "ws") +
        `/ws/chat/${this.chatId}/?token=${token}`;
      this.socketRef = new WebSocket(path);
      this.socketRef.onopen = () => {
        console.log("ChatClient open");
      };

      this.socketRef.onmessage = (e) => {
        this.socketNewMessage(e.data);
      };

      this.socketRef.onerror = (e) => {
        console.log(e.message);
      };

      this.socketRef.onclose = () => {
        console.log("ChatClient closed let's reopen");
        this.connect();
      };
      return true;
    } else {
      return false;
    }
  };

  socketNewMessage = (data) => {
    console.log("ChatClient ", data);
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    // this.callbacks["accept"]();
  };

  state = () => this.socketRef.readyState;

  connected = () => this.state === 1;

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
    this.socketRef.onclose = () => {};
    if (this.socketRef.readyState === 1 || this.socketRef.readyState === 0) {
      this.socketRef.close();
    }
  };
}

export const getChatClientInstance = (chatId) => ChatClient.getInstance(chatId);
