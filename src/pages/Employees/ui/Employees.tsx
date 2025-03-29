import { Link } from "react-router-dom";

const Employees = () => {
  return (
    <div style={{ color: "yellow" }}>
      <Link to="/" style={{ fontSize: "20px" }}>
        Back Home
      </Link>
      <Link to="/" style={{ fontSize: "20px" }}>
        Back Home
      </Link>
      <div style={{ width: "100%", background: "red" }}>employees</div>
      <div style={{ width: "100%", background: "red" }}>employees</div>
      <div style={{ width: "100%", background: "red" }}>employees</div>
      <div style={{ width: "100%", background: "red" }}>employees</div>
    </div>
  );
};

export default Employees;
