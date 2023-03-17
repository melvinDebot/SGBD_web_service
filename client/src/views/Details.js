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

  // CREATE NEW USER
  // const handlePost = (event) => {
  //   event.preventDefault();
  //   // Exemple de requête POST à une API
  //   axios.post(`http://localhost:8080${segments[0]}/${segments[1]}`, {
  //     name: "toto"
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // TODO: UPDATE NEW USER

  // TODO: DELETE NEW USER

  return (
    <div>
      <h1>Table : {segments[1]}</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>
                <input type="text" placeholder="Change name" />
                <button className="update">Update table</button>
              </td>
              <td>
                <button className="delete">Delete table</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <input
          type="text"
          placeholder="Create table"
          onChange={(e) => setNameData(e.target.value)}
          value={nameData}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

export default Details;
