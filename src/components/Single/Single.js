import React, { useEffect, useState } from "react";
import { db } from "../../firebaseInit";
import { useNavigate, userNavigation } from "react-router-dom";

function Single() {
  const navigate = useNavigate();
  const uid1 = 30;
  const uid2 = 31;

  const goToChat = (id) => {
    navigate(`s_chat/${id}`);
  };

  return (
    <>
      <div
        onClick={() => goToChat(uid2)}
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          margin: "5px auto",
          width: "50%",
          textAlign: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        User : tejendra
      </div>
      <div
        onClick={() => goToChat(uid1)}
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          margin: "5px auto",
          width: "50%",
          textAlign: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        User : ravi
      </div>
    </>
  );
}

export default Single;
