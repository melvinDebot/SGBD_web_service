import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [nameDatabase, setNameDatabase] = useState("");
  const [updateNameDatabase, setUpdateNameDatabase] = useState("");
  const [database, setDatabase] = useState([]);
  useEffect(() => {
    // Get all database
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
      id: `/${nameDatabase}`,
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
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Voir</th>
            
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
    </div>
  );
}

export default Home;
