import React, { useEffect, useState } from "react";
import { db } from "../../firebaseInit";
import FileUpload from "../Fileupload";
import firebase from "firebase";

function Single() {
  const [message, setMessage] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [userNewMsg, setUserNewMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);
  const uid1 = 30;
  const uid2 = 31;
  useEffect(() => {
    // show chat messages
    db.collection("chat").onSnapshot((snapshot) => {
      setMessage(
        snapshot.docs.map((item) => ({
          uid1: item.data().uid1,
          uid2: item.data().uid2,
          message: item.data().message,
          id: item.id,
          userName: item?.data()?.userName,
          timestamp: item?.data()?.timestamp,
          postImg: item?.data()?.postImg,
        }))
      );
    });
  }, []);

  useEffect(() => {
    db.collection("chat")
      .where("uid1", "in", [uid1, uid2])
      .get()
      .then((querySnapshot) => {
        let convo = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().uid1 == uid1 && doc.data().uid2 == uid2) ||
            (doc.data().uid1 == uid2 && doc.data().uid2 == uid1)
          ) {
            convo.push(doc.data());
          }
          setConversations(convo);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();
    if (userNewMsg) {
      const userName = "tejendra";
      const obj = {
        id: userNewMsg,
        timestamp: firebase.firestore.Timestamp.now(),
        uid1: uid1,
        uid2: uid2,
        message: userNewMsg,
        userName: userName,
      };

      // add data to channels -> message
      db.collection("chat")
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

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };

  const openModal = () => {
    setModalState(!modalState);
  };

  return (
    <>
      {modalState ? <FileUpload setState={openModal} file={file} /> : null}
      {conversations?.map((item) => {
        return (
          <div
            style={{
              display: "flex",
              flexFlow: `${item.uid1 === 31 ? "row-reverse" : "row"}`,
            }}
          >
            <div
              key={item.id}
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                margin: "5px 10px",
                width: "150px",
                padding: "10px",
              }}
            >
              <p>user: {item.id}</p>
              <p>{item.message}</p>
              {item?.postImg ? <img alt="img" src={item.postImg} /> : null}
            </div>
          </div>
        );
      })}
      <form
        autoComplete="off"
        style={{
          width: "100%",
          display: "flex",
          textAlign: "center",
          color: "white",
          backgroundColor: "black",
          position: "fixed",
          bottom: "0px",
          justifyContent: "center",
        }}
        onSubmit={(e) => sendMsg(e)}
      >
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(e) => handelFileUpload(e)}
        />
        <input
          required
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0.5rem",
            margin: "0.5rem",
          }}
          value={userNewMsg}
          onChange={(e) => {
            setUserNewMsg(e.target.value);
          }}
        />
        <button
          style={{
            border: "1px solid transparent",
            borderRadius: "5px",
            padding: "0.5rem",
            margin: "0.5rem",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default Single;
