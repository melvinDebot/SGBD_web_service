import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
  const nameDatabase = window.location.pathname;
  const [users, setUsers] = useState([]);
  const [nameTable, setNameTable] = useState("");
  const [updatenameTable, setUpdatenameTable] = useState("");
  const path_database = nameDatabase.replace("/", "");

  useEffect(() => {
    // Exemple de requête GET à une API
    axios
      .get(`http://localhost:8080${nameDatabase}`)
      .then((response) => {
        console.log(response.data, path_database);
        setUsers(response.data);
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
        id: users.length + 1,
        name: nameTable,
        data: {},
      })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TODO: UPDATE NEW USER
  const handleUpdate = (item) => { 
    const data = item;
    data.name = updateNameDatabase;
    console.log(data);
    axios.put(`http://localhost:8080/${path_database}`, data).then(() => {
      console.log("Update Table");
      window.location.reload(false);
    });
  }
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
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Voir</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <Link to={item.name}>Voir</Link>
              <td>
                <input
                  type="text"
                  placeholder="Change name"
                  onChange={(e)=>setUpdatenameTable(e.target.value)}
                />
                <button
                  className="update"
                  onClick={() => handleUpdate(item)}
                >
                  Update table
                </button>
              </td>
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
    </div>
  );
}

export default Table;