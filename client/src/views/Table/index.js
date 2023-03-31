import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTable, createTable, deleteTable } from "../../libs/utils";
import Popup from "../../components/Popup/Popup";

function Table() {
  const nameDatabase = window.location.pathname;
  const [table, setTable] = useState([]);
  const [nameTable, setNameTable] = useState("");

  const path_database = nameDatabase.replace("/", "");
  const [dataPopup, setDataPopup] = useState({
    title: "",
    color: "",
    isShow: false,
  });

  useEffect(() => {
    const loadData = async () => {
      getTable(path_database)
        .then((res) => {
          setTable(res.data.table);
        })
        .catch((error) => {
          setDataPopup({
            title: "error get Table !",
            color: "#FF796F",
            isShow: true,
          });
        });
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CREATE NEW USER
  const handlePost = (event) => {
    event.preventDefault();
    createTable(path_database, nameTable);
    setDataPopup({
      title: `Table ${nameTable} created!`,
      color: "#19C16B",
      isShow: true,
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  // TODO: DELETE NEW USER
  const handleDelete = (table) => {
    deleteTable(path_database, table);
    setDataPopup({
      title: `Table ${nameTable} Delete !`,
      color: "#19C16B",
      isShow: true,
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  return (
    <div>
      {dataPopup.isShow && (
        <Popup title={dataPopup.title} color={dataPopup.color} />
      )}
      <h2>Database : {path_database}</h2>
      <form>
        <input
          type="text"
          placeholder="Create table"
          onChange={(e) => setNameTable(e.target.value)}
          value={nameTable}
        />
        <button onClick={handlePost} className="create">
          Create
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Voir</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <Link to={item.name}>Voir</Link>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(item.name)}
                >
                  Delete table
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
