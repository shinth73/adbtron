/** @format */
var adb = require("adbkit");
const logcat = require("adbkit-logcat");
const { spawn } = require("child_process");
const WebSocket = require("ws");

const client = adb.createClient();
const port = { port: 8080 };
let wss = null;
let proc = null;
let timerId;

const stopLogcat = (mainWindow) => {
  console.log("Stop Logcat");
  proc.kill();
  wss.close();
  clearInterval(timerId);
};

const startLogcat = async (mainWindows) => {
  console.log("Start Logcat");
  if (wss === null) {
    wss = await new WebSocket.Server(port);
  }
  mainWindows.webContents.send("logcat:wsopened");
  wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });
    loggingStart(ws);
  });
};

let sendingInterval = 0;
let text = "";
const loggingStart = async (ws) => {
  const devices = await client.listDevices();
  console.log("Logging Start ...  Device id:", devices[0].id);
  proc = spawn("adb", ["logcat", "-b", "radio", "-B"]);
  const reader = await logcat.readStream(proc.stdout, { fixLineFeeds: false });

  timerId = setInterval(() => {
    sendingInterval++;
  }, 50);

  reader.on("entry", (entry) => {
    if (sendingInterval > 0 && text) {
      ws.send(text);
      text = "";
      sendingInterval = 0;
    }

    text = text !== "" ? (text = text + "\n" + JSON.stringify(entry)) : JSON.stringify(entry);
  });

  process.on("exit", () => {
    proc.kill();
    clearInterval(timerId);
  });
};

module.exports = { startLogcat: startLogcat, stopLogcat: stopLogcat };
