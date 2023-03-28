import axios from "axios";

/*****************
 * DATABASE CALL API
 *****************/
export const getDatabase = async () => {
  try {
    let res = await axios.get("http://localhost:8080");
    return res;
  } catch (error) {
    console.log("ERROR database");
    return error.response;
  }
};

export const createDatabase = async (id, name, table) => {
  try {
    let res = await axios.post("http://localhost:8080", {
      id: id,
      name: name,
      table: table,
    });
    return res;
  } catch (error) {
    console.log("ERROR database created!");
    return error.response;
  }
};

export const deleteDatabase = async (name_database) => {
  try {
    let res = await axios.delete(`http://localhost:8080/${name_database}`);
    return res;
  } catch (error) {
    console.log("Error delete! database");
    return error.response;
  }
};

/*****************
 * DATA CALL API
 *****************/
export const getData = async (database, table) => {
  try {
    let res = await axios.get(`http://localhost:8080/${database}/${table}`);
    return res;
  } catch (error) {
    return error.response;
  }
};
export const filterData = async (filter) => {
  try {
    let res = await axios.get(`http://localhost:8080/search?name=${filter}`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const createData = async (id, name, age, database, table) => {
  try {
    let res = await axios.post(`http://localhost:8080/${database}/${table}`, {
      id: id,
      name: name,
      age: age,
    });
    return res;
  } catch (error) {
    console.log("ERROR DATA created!");
    return error.response;
  }
};

export const deleteData = async (name_database, table, id) => {
  try {
    let res = await axios.delete(
      `http://localhost:8080/${name_database}/${table}/${id}`
    );
    return res;
  } catch (error) {
    console.log("Error delete! database");
    return error.response;
  }
};

/*****************
 * TABLE CALL API
 *****************/
export const getTable = async (database) => {
  try {
    let res = await axios.get(`http://localhost:8080/${database}`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const createTable = async (database, name) => {
  try {
    let res = await axios.post(`http://localhost:8080/${database}`, {
      id: `/${name}`,
      name: name,
      data: [],
    });
    return res;
  } catch (error) {
    console.log("ERROR TABLE created!", `http://localhost:8080/${database}`);
    return error.response;
  }
};

export const deleteTable = async (name_database, table) => {
  try {
    let res = await axios.delete(
      `http://localhost:8080/${name_database}/${table}`
    );
    return res;
  } catch (error) {
    console.log("Error delete! Table");
    return error.response;
  }
};
