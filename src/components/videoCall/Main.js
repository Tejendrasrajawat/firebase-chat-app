import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { rd } from "../../firebaseInit";

// // Global State
// const servers = {
//   iceServers: [
//     {
//       urls: [
//         "stun:stun.l.google.com:19302",
//         "stun:stun1.l.google.com:19302",
//         "stun:stun2.l.google.com:19302",
//         "stun:stun3.l.google.com:19302",
//         "stun:stun4.l.google.com:19302",
//         "stun:stun01.sipphone.com",
//         "stun:stun.ekiga.net",
//         "stun:stun.fwdnet.net",
//         "stun:stun.ideasip.com",
//         "stun:stun.iptel.org",
//         "stun:stun.rixtelecom.se",
//         "stun:stun.schlund.de",
//         "stun:stunserver.org",
//         "stun:stun.softjoys.com",
//         "stun:stun.voiparound.com",
//         "stun:stun.voipbuster.com",
//         "stun:stun.voxgratia.org",
//         "stun:stun.xten.com",
//       ],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };
// export const pc = new RTCPeerConnection(servers);

function Main() {
  const [currentPage, setCurrentPage] = useState("");
  const [userName, setUserName] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (currentPage === "meet") {
      var firepadRef = rd;
      // const name = prompt("What's your name?");
      // setUserName(name);
      const urlparams = new URLSearchParams(window.location.search);
      const roomId = urlparams.get("id");
      if (roomId) {
        firepadRef = firepadRef.child(roomId);
      } else {
        firepadRef = firepadRef.push();

        navigate(`../meet/${firepadRef.key}`);
      }
    }
  }, [currentPage]);

  return (
    <div className="app">
      <button onClick={() => setCurrentPage("meet")}>Call</button>
    </div>
  );
}

export default Main;
