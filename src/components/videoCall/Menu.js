import "./Menu.css";

function Menu({ joinCode, setJoinCode, setPage }) {
  return (
    <div className="home">
      <p> To start a video call click on new call button</p>
      <div className="create_box">
        <button onClick={() => setPage("create")}>New Call</button>
      </div>

      <div className="answer_box">
        <p>Have a Join code, put it below..</p>
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
        <button onClick={() => setPage("join")}>Answer</button>
      </div>
    </div>
  );
}

export default Menu;
