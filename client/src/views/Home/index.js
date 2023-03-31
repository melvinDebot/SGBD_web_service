import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import { getDatabase, createDatabase, deleteDatabase } from "../../libs/utils";

function Home() {
  const [nameDatabase, setNameDatabase] = useState("");
  const [database, setDatabase] = useState([]);
  const [dataPopup, setDataPopup] = useState({
    title: "",
    color: "",
    isShow: false,
  });

  useEffect(() => {
    const loadData = async () => {
      getDatabase()
        .then((res) => {
          setDatabase(res.data);
        })
        .catch((error) => {
          setDataPopup({
            title: "error get database!",
            color: "#FF796F",
            isShow: true,
          });
          console.log(error);
        });
    };
    loadData();
  }, []);

  // CREATE NEW DATABASE
  const handlePost = (event) => {
    event.preventDefault();
    createDatabase(`/${nameDatabase}`, nameDatabase, []);
    setDataPopup({
      title: `Database ${nameDatabase} created!`,
      color: "#19C16B",
      isShow: true,
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  // DELETE DATABASE
  const handleDelete = (database) => {
    deleteDatabase(database);
    setDataPopup({
      title: `Database ${database} delete!`,
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
          {database.map((item) => (
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
