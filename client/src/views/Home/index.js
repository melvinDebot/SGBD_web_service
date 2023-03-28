import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup/Popup";
import { getDatabase, createDatabase } from "../../libs/utils";

function Home() {
  const [nameDatabase, setNameDatabase] = useState("");
  const [updateNameDatabase, setUpdateNameDatabase] = useState("");
  const [database, setDatabase] = useState([]);

  
  useEffect(() => {
    const loadData = async () => {
      getDatabase()
        .then((res) => {
          setDatabase(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData()
    
  }, []);

  // CREATE NEW DATABASE
  const handlePost = (event) => {
    event.preventDefault();
    createDatabase(`/${nameDatabase}`, nameDatabase, [])
    window.location.reload(false);
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
      <Popup title="My Title" />
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
        <tbody id="user-item">
          {database.map((item, key) => (
            <tr key={item.id}>
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
