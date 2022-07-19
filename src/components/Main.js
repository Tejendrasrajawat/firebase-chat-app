import React, { useEffect, useState } from "react";
import Group from "./Group/Group";
import Single from "./Single/Single";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseInit";
import style from "./Main.module.css";

function Main(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout = () => {
    auth.signOut();
    localStorage.clear();
  };
  return (
    <>
      <h4 className={style.heading}>
        Welcome <span>{user?.displayName}</span>, You can chat one to one or
        join one of the rooms.
      </h4>
      <div className={style.box}>
        <div className={style.single}>
          <button onClick={() => navigate("/single")}>
            Go To Single Chat Demo
          </button>
        </div>
        <div className={style.group}>
          <button onClick={() => navigate("/group")}>
            Go To Group Chat Demo
          </button>
        </div>
      </div>
      <div className={style.common}>
        <button onClick={() => navigate("/common")}>
          Go To Common Chat Demo
        </button>
      </div>
      {/* <button onClick={logout}>Sign Out</button> */}
    </>
  );
}

export default Main;
