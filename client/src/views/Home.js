import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


function Home() {
  const [nameDatabase, setNameDatabase] = useState('');
  const [database, setDatabase] = useState([]);
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

    // CREATE NEW DATABASE
    const handlePost = (event) => {
      event.preventDefault();
      const newObject = {
        [nameDatabase]: []
      };
      // Exemple de requête POST à une API
      axios.post("http://localhost:8080", newObject)
        .then(response => {
          // ADD POPUP
          window.location.reload(false);
        })
        .catch(error => {
          console.log(error);
        });
    }

    const handleDelete = (database) => {
      axios.delete(`http://localhost:8080/${database}`)
    .then(() => {
      console.log('Delete Database');
      window.location.reload(false);
    });
    }

    return (
      <div>
        <h1>DATABASE</h1>
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
            <td>{Object.keys(item)[0]}</td>
            <td>
            <Link to={Object.keys(item)[0]}>Voir</Link>   
            </td>
            <td>
              <button onClick={()=> handleDelete(Object.keys(item)[0])} className='delete'>Delete</button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
    <form>
      <input type="text" placeholder="Create name database" onChange={(e)=> setNameDatabase(e.target.value)} value={nameDatabase}/>
      <button onClick={handlePost} className="create">Create</button>
    </form>
      </div>
    );
  }
  
  export default Home;