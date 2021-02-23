/** @format */
import React, { useState } from "react";
import { LazyLog, ScrollFollow } from "react-lazylog";
const { ipcRenderer } = window.require("electron");

export const Logcat = () => {
  const [wsOpen, setWsOpen] = useState(false);
  const url = "ws://localhost:8080/";
  let socket = null;

  ipcRenderer.on("logcat:wsopened", () => {
    console.log("server opened");
    setWsOpen(true);
  });

  return (
    <div>
      <div>
        <button
          className="mx-5 text-lg px-3 font-medium text-red-500 bg-lime-600 hover:bg-lime-700"
          onClick={() => {
            ipcRenderer.send("logcat:start");
          }}
        >
          Start
        </button>
        <button
          className="mr-5 text-lg px-3 font-medium text-red-500 bg-lime-600 hover:bg-lime-700"
          onClick={() => {
            ipcRenderer.send("logcat:stop");
          }}
        >
          Stop
        </button>
      </div>
      {!wsOpen ? (
        <h1 className="text-2xl text-red-700">Press to Start ...</h1>
      ) : (
        <div className="flex items-center justify-center">
          <div style={{ height: 900, width: 1500 }}>
            <ScrollFollow
              startFollowing
              render={({ onScroll, follow, startFollowing, stopFollowing }) => (
                <LazyLog
                  enableSearch
                  caseInsensitive
                  selectableLines
                  highlight
                  url={url}
                  websocket
                  // websocketOptions={{
                  //   onOpen: (e, sock) => {
                  //     socket = sock;
                  //     sock.send(JSON.stringify({ message: "Socket has been opened!" }));
                  //   },
                  //   // formatMessage: (e) => JSON.parse(e).message,
                  // }}
                  onScroll={onScroll}
                  follow={follow}
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Logcat;
