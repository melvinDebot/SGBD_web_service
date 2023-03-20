import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [nameDatabase, setNameDatabase] = useState("");
  const [updateNameDatabase, setUpdateNameDatabase] = useState("");
  const [database, setDatabase] = useState([]);
  useEffect(() => {
    // Exemple de requête GET à une API
    axios
      .get("http://localhost:8080")
      .then((response) => {
        console.log(response.data);
        setDatabase(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CREATE NEW DATABASE
  const handlePost = (event) => {
    event.preventDefault();
    const newObject = {
      id: database.length + 1,
      name: nameDatabase,
      table: [],
    };
    // Exemple de requête POST à une API
    axios
      .post("http://localhost:8080", newObject)
      .then((response) => {
        // ADD POPUP
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TODO: UPDATE DATABASE
  const handleUpdate = (item) => {
    const data = item;
    data.name = updateNameDatabase;
    console.log(data);
    axios.put(`http://localhost:8080`, data).then(() => {
      console.log("Update Table");
      window.location.reload(false);
    });
  };

  const handleDelete = (database) => {
    console.log(database);
    axios.delete(`http://localhost:8080/${database}`).then(() => {
      console.log("Delete Database");
      window.location.reload(false);
    });
  };

  return (
    <div>
      <h2>DATABASE</h2>
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
          {database.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>
                <Link to={item.name}>Voir</Link>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Update name database"
                  onChange={(e) => setUpdateNameDatabase(e.target.value)}
                />
                <button
                  className="update"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item.name)}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <input
          type="text"
          placeholder="Create name database"
          onChange={(e) => setNameDatabase(e.target.value)}
          value={nameDatabase}
        />
        <button onClick={handlePost} className="create">
          Create
        </button>
      </form>
    </div>
  );
}

export default Home;
