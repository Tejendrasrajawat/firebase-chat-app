import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../../firebaseInit";
import Main from "../Main";
import { useNavigate, Link } from "react-router-dom";
import style from "./Login.module.css";

function Login() {
  const [user, setUser] = useState(null);
  const [confirm, setConfirm] = useState(false);
  let navigate = useNavigate();
  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Login Success...");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("user exits", doc);
          } else {
            const details = {
              name: user.displayName,
              displayName: user.displayName.split(" ")[0],
              photoURL: user.photoURL,
              email: user.email,
              uid: user.uid,
            };
            db.collection("users")
              .doc(user.uid)
              .set(details)
              .then((res) => {
                console.log("new user created", res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setUser(user);
      setConfirm(true);
    });
  }, [user]);

  useEffect(() => {
    if (confirm) {
      user
        ? navigate("/main", { state: { user: user } })
        : console.log("Login First !");
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [confirm]);

  return (
    <>
      <div className="login">
        {!user && (
          <button onClick={login} className={style.sign}>
            Sign In With Google
          </button>
        )}
        {user && (
          <button onClick={logout} className={style.sign}>
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}

export default Login;
