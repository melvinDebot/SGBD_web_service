import React, { useState, useEffect } from "react";
import axios from "axios";

function splitUrl(url) {
  const segments = url.split("/");
  return segments.filter((segment) => segment !== "");
}

function Details() {
  const [pathTable] = useState(window.location.pathname);
  const [data, setData] = useState([]);
  const [nameData, setNameData] = useState("");
  const [age, setAge] = useState(0);
  const [filter, setFilter] = useState("");

  const [mapState, setMapState] = useState({ name: "", age: 0, id: 0 });

  const segments = splitUrl(pathTable);

  useEffect(() => {
    // Exemple de requête GET à une API
    axios
      .get(`http://localhost:8080/${segments[0]}/${segments[1]}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //CREATE NEW USER
  const handlePost = () => {
    // Exemple de requête POST à une API
    if (nameData !== "" && age !== 0) {
      console.log(nameData, age);

      axios
        .post(`http://localhost:8080/${segments[0]}/${segments[1]}`, {
          name: nameData,
          id: data.length + 1,
          age: age,
        })
        .then((response) => {
          setMapState({ name: "", age: 0, id: 0 });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("champs manquant");
    }
  };

  // TODO: UPDATE NEW USER
  const handleUpdate = (item) => {
    if (mapState.name !== "" && mapState.age !== 0) {
      axios
        .put(`http://localhost:8080/${segments[0]}/${segments[1]}/${item.id}`, {
          name: mapState.name,
          age: mapState.age,
          id: item.id,
        })
        .then((response) => {
          setMapState({ name: "", age: 0, id: 0 });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("champs manquant");
    }
  };
  // TODO: FILTER DATA
  const handleFilter = (event) => {
    event.preventDefault();
    if (filter !== "") {
      axios
        .get(`http://localhost:8080/search?name=${filter}`)
        .then((response) => {
          setData([response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:8080/${segments[0]}/${segments[1]}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // TODO: DELETE NEW USER
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/${segments[0]}/${segments[1]}/${id}`)
      .then(() => {
        console.log("Delete data");
        window.location.reload(false);
      });
  };

  return (
    <div>
      <h2>Table : {segments[1]}</h2>
      <form>
        <input
          type="text"
          placeholder={`Create new ${segments[1]}`}
          onChange={(e) => setNameData(e.target.value)}
        />
        <input
          type="number"
          placeholder="add age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={() => handlePost()} className="create">
          Create
        </button>
      </form>
      <form>
        <input
          type="text"
          placeholder="Search name"
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={(e) => handleFilter(e)} className="create">
          Filter
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>age</th>
            <th>Update name</th>
            <th>Update age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <input
                  type="text"
                  placeholder="Change name"
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setMapState((prevState) => {
                        return { ...prevState, name: e.target.value };
                      });
                    } else {
                      alert("Please enter a name");
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Change age"
                  onChange={(e) =>
                    setMapState((prevState) => {
                      return { ...prevState, age: e.target.value };
                    })
                  }
                />
              </td>
              <td>
                <button className="update" onClick={() => handleUpdate(item)}>
                  Update data
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(item.name)}
                >
                  Delete data
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Details;
