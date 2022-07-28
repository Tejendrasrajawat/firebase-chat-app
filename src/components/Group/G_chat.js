import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebaseInit";
import FileUpload from "../FileUpload/Fileupload";
import { useLocation } from "react-router-dom";
import style from "./G_chat.module.css";

// shows message by id
function G_chat() {
  const params = useParams();
  const location = useLocation();
  const downSlide = useRef();

  const [channelName, setChannelName] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [userNewMsg, setUserNewMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(null);
  const [filteredMsg, setFilterMsg] = useState(null);
  const [send, setSend] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setTimeout(() => {
      downSlide.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, []);

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

  // when submit the message form
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
      // empty message input
      setUserNewMsg("");
      // empty filter input
      setFilterMsg("");
      // remove send button
      setSend(false);
      // empty search
      setSearch("");
    }
    downSlide.current.scrollIntoView({ behavior: "smooth" });
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

  const showSearchResult = (e) => {
    e.preventDefault();
    // filter messages according to search
    const filtered = allMessages.filter((str) => {
      return str.data.text.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    });
    // set messages to state
    setFilterMsg(filtered);
    // set msg
    setUserNewMsg(search);
    setSearch("");
    setSend(true);
  };

  // scroll to filter data
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
          <h4>
            Ath Marine Welcomes You in group chat for the request ID:{" "}
            {channelName}
          </h4>
          <p>This room is active for 24:00 Hours</p>
        </div>
        <div className={style.chatBox}>
          {/* show all messages in chat */}
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
              id={`message_${message.data.timestamp.seconds}`}
              key={message.data.timestamp.seconds}
            >
              <div className={style.message}>
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
                    onClick={() => goToFilterData(item.data.timestamp.seconds)}
                    key={item.data.timestamp.seconds}
                  >
                    {item.data.text}
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

      {modalState ? <FileUpload setState={openModal} file={file} /> : null}
    </>
  );
}

export default G_chat;
