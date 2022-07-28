import React, { useState, useEffect } from "react";
import { storage } from "../../firebaseInit";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebaseInit";
import style from "./FileUpload.module.css";

function FileUpload({ setState, file }) {
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressBar, setProgressBar] = useState({ display: "none" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  const handleClose = () => {
    setOpen(false);
    setState();
  };

  const sendMsg = (downloadURL) => {
    if (params.id) {
      const postImg = downloadURL;
      const obj = {
        text: message,
        timestamp: firebase.firestore.Timestamp.now(),
        userName: user.displayName,
        uid: user.uid,
        postImg: postImg,
      };

      db.collection("channels")
        .doc(params.id)
        .collection("messages")
        .add(obj)
        .then((res) => {
          console.log("message sent with image..");
        })
        .catch((err) => {
          console.log(err);
        });
      //   }

      setMessage("");
    }
  };

  const fileObj = URL.createObjectURL(file);

  const handleUpload = (e) => {
    e.preventDefault();
    setProgressBar({ display: "block" });
    const uploadRef = storage.ref(`images/${file.name}`).put(file);
    uploadRef.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          sendMsg(downloadURL);
        });
        handleClose();
      }
    );
  };

  return (
    <div className={style.FileUpload}>
      <div open={open} onClose={handleClose}>
        <div>
          <img src={fileObj} alt={file.name} className={style.upImg} />
          <div style={{ marginLeft: "10px" }}>FileName: {file.name}</div>
          <br />
        </div>

        <form
          autoComplete="off"
          onSubmit={(e) => {
            handleUpload(e);
          }}
          className={style.uploadForm}
        >
          <input
            placeholder="Add A Message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className={style.messageInput}
          />
        </form>
        <p style={progressBar}>Uploading...{progress}%</p>
        <button onClick={handleClose}>Cancel</button>
        <button type="submit" onClick={(e) => handleUpload(e)}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
