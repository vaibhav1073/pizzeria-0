import React from "react";
import AdminTableOne from "./AdminTableOne";
import AdminTableTwo from "./AdminTableTwo";

export default function AdminTable() {
  const [outlineClasses, setOutlineClasses] = React.useState([
    "btn btn-warning btn-lg mx-2",
    "btn btn-outline-warning btn-lg mx-2",
  ]);
  const [showAdmin, setShowAdmin] = React.useState(true);

  const buttonClick = () => {
    setShowAdmin(!showAdmin);
    showAdmin
      ? setOutlineClasses([
          "btn btn-warning btn-lg mx-2",
          "btn btn-outline-warning btn-lg mx-2",
        ])
      : setOutlineClasses([
          "btn btn-outline-warning btn-lg mx-2",
          "btn btn-warning btn-lg mx-2",
        ]);
  };
  return (
    <div className="container mt-3 mx-auto text-center">
      <button className={outlineClasses[0]} onClick={() => buttonClick()}>
        Pizza Table
      </button>
      <button
        className={outlineClasses[1]}
        onClick={() => buttonClick()}
      >
        Mange Stores
      </button>
      {showAdmin ? <AdminTableTwo />: <AdminTableOne /> }
    </div>
  );
}
