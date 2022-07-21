import React, { useEffect, useState } from "react";
import { db } from "../../firebaseInit";
import { useNavigate, userNavigation } from "react-router-dom";
import style from "./Single.module.css";

function Single() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const uid1 = user.uid;
  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    // show chat messages
    db.collection("users").onSnapshot((snapshot) => {
      setConversations(
        snapshot.docs.map((item) => ({
          uid: item.data().uid,
          displayName: item.data().displayName,
        }))
      );
    });
  }, []);

  const goToChat = (id) => {
    navigate(`../s_chat/${id}`);
  };

  return (
    <div className={style.single}>
      <h4 style={{ textAlign: "center", width: "100vw" }}>
        Hi {user.displayName} , Welcome to transas.
      </h4>
      {conversations?.map((item) => (
        <>
          {item.displayName !== user.displayName && (
            <div
              onClick={() => goToChat(item.uid)}
              className={style.card}
              key={item.uid}
            >
              <p> {item.displayName}</p>
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default Single;
