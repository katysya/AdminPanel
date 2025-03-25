import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "30px",
      }}
    >
      <div style={{ fontSize: "40px" }}>Home pages</div>
      <Link to="/">Home</Link>
      <Link to="/employees">Employees</Link>
    </div>
  );
};

export default Home;
