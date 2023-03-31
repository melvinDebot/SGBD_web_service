import React, { useState, useEffect } from "react";
import { getData, filterData, deleteData, createData } from "../../libs/utils";

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

  const segments = splitUrl(pathTable);

  useEffect(() => {
    const loadData = async () => {
      getData(segments[0], segments[1])
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData();
  }, []);

  //CREATE NEW USER
  const handlePost = () => {
    // Exemple de requête POST à une API
    if (nameData !== "" && age !== 0) {
      createData(`/${nameData}`, nameData, age, segments[0], segments[1]);
      window.location.reload(false);
    }
  };

  // TODO: FILTER DATA
  const handleFilter = (event) => {
    event.preventDefault();
    if (filter !== "") {
      filterData(segments[0], segments[1], filter).then((res) => {
        console.log(res.data);
        setData(res.data.data);
      });
    } else {
      getData(segments[0], segments[1])
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // TODO: DELETE NEW USER
  const handleDelete = (id) => {
    deleteData(segments[0], segments[1], id);
    window.location.reload(false);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>{item.age}</td>

              <td>
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
