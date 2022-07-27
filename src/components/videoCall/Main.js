import React, { useRef, useState } from "react";
import Menu from "./Menu";
import Videos from "./Videos";
import { useNavigate } from "react-router-dom";
import "./Main.css";

// Global State
const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun01.sipphone.com",
        "stun:stun.ekiga.net",
        "stun:stun.fwdnet.net",
        "stun:stun.ideasip.com",
        "stun:stun.iptel.org",
        "stun:stun.rixtelecom.se",
        "stun:stun.schlund.de",
        "stun:stunserver.org",
        "stun:stun.softjoys.com",
        "stun:stun.voiparound.com",
        "stun:stun.voipbuster.com",

        "stun:stun.voxgratia.org",
        "stun:stun.xten.com",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};
export const pc = new RTCPeerConnection(servers);

function Main() {
  const [currentPage, setCurrentPage] = useState("");
  const [joinCode, setJoinCode] = useState("");
  let navigate = useNavigate();

  return (
    <div className="app">
      <button onClick={() => setCurrentPage("home")}>Call</button>
      {currentPage === "home" ? (
        <>
          <div className="cross" onClick={() => setCurrentPage("")}>
            ❌
          </div>
          <div className="backdrop">
            <Menu
              joinCode={joinCode}
              setJoinCode={setJoinCode}
              setPage={setCurrentPage}
            />
          </div>
        </>
      ) : currentPage === "" ? null : (
        <>
          <div className="cross" onClick={() => setCurrentPage("")}>
            ❌
          </div>
          <div className="backdrop">
            <Videos
              mode={currentPage}
              callId={joinCode}
              setPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
