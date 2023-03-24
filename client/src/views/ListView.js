import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";

function ListView() {
  const [users, setUsers] = useState([]);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    // Exemple de requête GET à une API
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <header>Titre de mon composant</header>
      <button onClick={() => setIsClick(true)} className="update">
        Cliquer ici !
      </button>
      <Title title="My Title" data-testid="title" />
      {isClick && <div>Merci d'avoir cliqué</div>}
      {users.splice(0, 4).map((item, key) => (
        <div key={key}>{item.title}</div>
      ))}
    </div>
  );
}

export default ListView;
