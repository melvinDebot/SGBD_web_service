import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
  const nameDatabase = window.location.pathname;
  const [table, setTable] = useState([]);
  const [nameTable, setNameTable] = useState("");
  const path_database = nameDatabase.replace("/", "");

  useEffect(() => {
    // Exemple de requête GET à une API
    axios
      .get(`http://localhost:8080${nameDatabase}`)
      .then((response) => {
        console.log(response.data, path_database);
        setTable(response.data.table);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CREATE NEW USER
  const handlePost = (event) => {
    event.preventDefault();
    // Exemple de requête POST à une API
    axios
      .post(`http://localhost:8080${nameDatabase}`, {
        id: `/${nameTable}`,
        name: nameTable,
        data: [],
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TODO: DELETE NEW USER
  const handleDelete = (table) => {
    
    axios.delete(`http://localhost:8080/${path_database}/${table}`).then(() => {
      console.log("Delete Table");
      window.location.reload(false);
    });
  };

  return (
    <div>
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
