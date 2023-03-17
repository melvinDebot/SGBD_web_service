
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

function Table() {
    const nameDatabase = window.location.pathname;
    const [users, setUsers] = useState([]);
    const [nameTable, setNameTable] = useState('');
    const path_database = nameDatabase.replace("/", "")

    useEffect(() => {
      // Exemple de requête GET à une API
      axios.get(`http://localhost:8080${nameDatabase}`)
        .then(response => {
          console.log(response.data[path_database], path_database)
          setUsers(response.data[path_database]);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    // CREATE NEW USER 
    const handlePost = (event) => {
      event.preventDefault();
      // Exemple de requête POST à une API
      axios.post(`http://localhost:8080${nameDatabase}`, {
        [nameTable]: [{name : "melvin"}]
      })
        .then(response => {
          console.log(response.data);
          window.location.reload(false);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // TODO: UPDATE NEW USER 
    // TODO: DELETE NEW USER 
    const handleDelete = (database) => {
      axios.delete(`http://localhost:8080/${database}`)
    .then(() => {
      console.log('Delete Database');
      window.location.reload(false);
    });
    }

    return (
      <div>
        <h1>Table</h1>
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
      
      {users.map((item, key) => (
        <tr key={key}>
          <td>{Object.keys(item)[0]}</td>
          <Link to={`${Object.keys(item)[0]}`}>Voir</Link>   
          <td>
            <input type="text" placeholder="Change name" />
          <button className='update'>
            Update table
          </button>
              
          </td>
          <td>
          <button className='delete' onClick={()=> handleDelete(Object.keys(item)[0])}>
            Delete table
          </button>
              
          </td>
          
        </tr>
      ))}
    </tbody>
  </table>
  <form>
    <input type="text" placeholder="Create table" onChange={(e)=> setNameTable(e.target.value)} value={nameTable}/>
    <button onClick={handlePost} className="create">Create</button>
  </form>
    </div>
    )
}

export default Table;