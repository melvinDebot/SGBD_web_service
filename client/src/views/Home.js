import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


function Home() {
  const [nameDatabase, setNameDatabase] = useState('');
  const [database, setDatabase] = useState([]);
    const [data, setData] = useState([
      {
        "Ynov": 
          {
            "user": [
              {
                "name": "Jean",
                "age": 25
              },
              {
                "name": "Pierre",
                "age": 26
              }
  
            ]
          }
        
      },
      {
        "Ynov1": [
          {
            "user": [
              {
                "name": "Jean",
                "age": 25
              },
              {
                "name": "Pierre",
                "age": 26
              }
  
            ]
          }
        ]
      }
    ]);
    useEffect(() => {
      // Exemple de requête GET à une API
      axios.get("http://localhost:8080")
        .then(response => {
          console.log(response.data)
          setDatabase(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const handlePost = (event) => {
      event.preventDefault();
      const newObject = {
        nameDatabase: {}
      };
      // Exemple de requête POST à une API
      axios.post("http://localhost:8080", newObject)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }

    return (
      <div>
        <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Voir</th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((item, key) => (
          <tr key={key}>
            <td>{Object.keys(data[key])}</td>
            <td>
            <Link to={`${Object.keys(data[key])}`}><button>Voir</button></Link>
                
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
    <form>
      <input type="text" placeholder="Create database" onChange={(e)=> setNameDatabase(e.target.value)} value={nameDatabase}/>
      <button onClick={handlePost}>Create</button>
    </form>
      </div>
    );
  }
  
  export default Home;