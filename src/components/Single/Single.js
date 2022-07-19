import React, { useEffect, useState } from "react";
import { db } from "../../firebaseInit";
import { useNavigate, userNavigation } from "react-router-dom";
import style from "./Single.module.css";

function Single() {
  const navigate = useNavigate();
  const demo = [];
  for (let i = 0; i < 50; i++) {
    demo.push({ uid: (Math.random() * 1000).toFixed(0) });
  }

  const goToChat = (id) => {
    navigate(`s_chat/${id}`);
  };

  return (
    <div className={style.single}>
      {demo.map((item) => (
        <div onClick={() => goToChat(item.uid)} className={style.card}>
          <p> {item.uid}</p>
        </div>
      ))}
    </div>
  );
}

export default Single;
