import React, { useState, useEffect } from "react";
import { db } from "../../firebaseInit";

// create group
function CreateGroup() {
  const [roomName, setRoomName] = useState("");
  const [channelList, setChannelList] = useState(null);

  const handleNewRoom = (e) => {
    e.preventDefault();
    if (roomName) {
      addChannel(roomName);
    }
    setRoomName("");
  };

  useEffect(() => {
    // show channel list
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannelList(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);

  const addChannel = (cName) => {
    //  add channelName
    db.collection("channels")
      .add({ channelName: cName.toLowerCase() })
      .then((res) => {
        console.log("added new channel");
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <p>Create A New Channel</p>
        <div>
          <form autoComplete="off" onSubmit={handleNewRoom}>
            <input
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              style={{
                width: "50%",
                boxSizing: "border-box",
                margin: "0.2rem",
              }}
            />
          </form>
        </div>
        <div>
          <button
            style={{
              // backgroundColor: "blue",
              border: "1px solid black",
              borderRadius: "5px",

              padding: "0.5rem",
              margin: "0.5rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              handleNewRoom(e);
            }}
            style={{
              // backgroundColor: "blue",
              borderRadius: "5px",
              border: "1px solid black",
              padding: "0.5rem",
              margin: "0.5rem",
              cursor: "pointer",
            }}
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
