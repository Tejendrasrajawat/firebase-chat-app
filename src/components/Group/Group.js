import React, { useState, useEffect } from "react";
import { db } from "../../firebaseInit";
import { useNavigate } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import style from "./Group.module.css";

// shows channels
function Group(props) {
  const [channels, setChannels] = useState(null);
  const navigate = useNavigate();
  // shows channels name
  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannels(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);

  // send to channel by id
  const goToChannel = (id) => {
    navigate(`/g_chat/${id}`);
  };

  return (
    <div>
      <CreateGroup />
      <div className={style.cardBox}>
        {channels?.map((item) => (
          <div
            className={style.card}
            onClick={() => goToChannel(item.id)}
            key={item.id}
          >
            <div className={style.innerText}>
              <h4>
                <b>{item.channelName}</b>
                <p>Group Chat</p>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Group;
