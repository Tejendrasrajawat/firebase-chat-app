import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseInit";
import FileUpload from "../FileUpload/Fileupload";
import firebase from "firebase";
import style from "./S_chat.module.css";
import { useParams } from "react-router-dom";

import FileUpload_S from "../FileUpload/Fileupload_S";
import Main from "../videoCall/Main";

function Single() {
  const downSlide = useRef();
  const params = useParams();
  const [message, setMessage] = useState(null);
  const [userNewMsg, setUserNewMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);
  const [send, setSend] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredMsg, setFilterMsg] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const uid1 = user.uid;
  const uid2 = params.id;

  useEffect(() => {
    setTimeout(() => {
      downSlide.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, []);

  useEffect(() => {
    db.collection("chat")
      .where("uid1", "in", [uid1, uid2])
      .orderBy("timestamp", "asc")
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
          setMessage(convo);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [send, message]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (userNewMsg) {
      const userName = user.displayName;
      const obj = {
        id: (Math.random() * 1000000).toFixed(0),
        timestamp: firebase.firestore.Timestamp.now(),
        uid1: uid1,
        uid2: uid2,
        message: userNewMsg,
        userName: userName,
        postImg: null,
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
      setSend(false);
      setSearch("");
      setFilterMsg("");
    }
    setTimeout(() => {
      downSlide.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  const showSearchResult = (e) => {
    e.preventDefault();
    // filter messages according to search

    const filtered = message?.filter((str) => {
      return str.message.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    });

    // set messages to state
    // set msg
    setFilterMsg(filtered);
    setUserNewMsg(search);
    setSearch("");
    setSend(true);
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

  const goToFilterData = (id) => {
    const element = document.getElementById("message_" + id);
    element.scrollIntoView();
    setSearch("");
    setUserNewMsg("");
    setFilterMsg("");
    setSend(false);
  };

  const onCloseFilter = () => {
    setSend(false);
    setFilterMsg("");
  };

  return (
    <>
      <div>
        <div className={style.welcome}>
          <div style={{ width: "90vw" }}>
            <h4>Super Chat Welcomes You {user?.displayName}</h4>
            <p>This room is active for 24:00 Hours</p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Main />
          </div>
        </div>
        <div className={style.chatBox}>
          {/* show all messages in chat */}
          {message?.map((message) => (
            <div
              style={{
                display: "flex",
                flexFlow: `${
                  message.userName == user?.displayName ? "row-reverse" : "row"
                }`,
              }}
              id={`message_${message.id}`}
              key={message.id}
            >
              <div className={style.message}>
                <h4>
                  <p>{message.userName}</p>
                </h4>
                <p>{message.message}</p>
                {message?.postImg ? (
                  <img alt="img" src={message?.postImg} width="300px" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div ref={downSlide}></div>
        {/*shows filter messages in modal */}
        {filteredMsg ? (
          <>
            <div className={style.cross} onClick={onCloseFilter}>
              ❌
            </div>
            <div className={style.filter}>
              <p style={{ textAlign: "center" }}>
                We found {filteredMsg.length} similler results.
              </p>

              <ol>
                {filteredMsg?.map((item) => (
                  <li
                    className={style.filterData}
                    onClick={() => goToFilterData(item.id)}
                    key={item.timestamp.seconds}
                  >
                    {item.message}
                  </li>
                ))}
              </ol>
            </div>
          </>
        ) : null}
        <form
          autoComplete="off"
          onSubmit={send ? (e) => sendMsg(e) : (e) => showSearchResult(e)}
          className={style.chatFrom}
        >
          <div className={style.customFileInput}>
            <button className={style.btnAttach}>📎</button>
            <input
              type="file"
              name="myfile"
              onChange={(e) => handelFileUpload(e)}
            />
          </div>

          <input
            required
            value={send ? userNewMsg : search}
            className={style.messageInput}
            placeholder={
              filteredMsg
                ? `We found ${filteredMsg.length} results`
                : "Enter Your Message Here ..."
            }
            onChange={
              send
                ? (e) => setUserNewMsg(e.target.value)
                : (e) => setSearch(e.target.value)
            }
          />
          {send ? <button>Send</button> : <button>Search</button>}
        </form>
      </div>

      {modalState ? <FileUpload_S setState={openModal} file={file} /> : null}
    </>
  );
}

export default Single;
