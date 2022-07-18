import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebaseInit";
import FileUpload from "../Fileupload";
import { useLocation } from "react-router-dom";
import style from "./G_chat.module.css";

// shows message by id
function G_chat() {
  const params = useParams();
  const location = useLocation();
  const [channelName, setChannelName] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [userNewMsg, setUserNewMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log(user);
  useEffect(() => {
    // show channel name
    if (params.id) {
      db.collection("channels")
        .doc(params.id)
        .onSnapshot((snapshot) => {
          setChannelName(snapshot.data().channelName);
        });

      // show messages data
      db.collection("channels")
        .doc(params.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [params]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (userNewMsg && params.id) {
      const postImg = null;
      const userName = user.displayName;
      const uid = user.uid;
      const obj = {
        text: userNewMsg,
        timestamp: firebase.firestore.Timestamp.now(),
        postImg: postImg,
        userName: userName,
        uid: uid,
      };

      // add data to channels -> message
      db.collection("channels")
        .doc(params.id)
        .collection("messages")
        .add(obj)
        .then((res) => {
          console.log("message sent");
        })
        .catch((err) => {
          console.log(err);
        });
      // }

      setUserNewMsg("");
    }
  };

  const openModal = () => {
    setModalState(!modalState);
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };

  return (
    <>
      <div>
        <h3 className={style.welcome}>Welcome in {channelName} group</h3>

        <div className={style.chatBox}>
          {allMessages?.map((message) => (
            <div
              style={{
                display: "flex",
                flexFlow: `${
                  message.data.userName == user?.displayName
                    ? "row-reverse"
                    : "row"
                }`,
              }}
            >
              <div key={message.id} className={style.message}>
                <h4>
                  <p>{message.data.userName}</p>
                </h4>
                <p>{message.data.text}</p>
                {message.data?.postImg ? (
                  <img alt="img" src={message.data?.postImg} width="300px" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <form
          autoComplete="off"
          onSubmit={(e) => sendMsg(e)}
          className={style.chatFrom}
        >
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className={style.customFileInput}
            onChange={(e) => handelFileUpload(e)}
          />
          <input
            required
            value={userNewMsg}
            style={{ width: "700px" }}
            placeholder="Enter Your Message Here..."
            onChange={(e) => {
              setUserNewMsg(e.target.value);
            }}
          />
          <button>Send</button>
        </form>
      </div>

      {modalState ? <FileUpload setState={openModal} file={file} /> : null}
    </>
  );
}

export default G_chat;
