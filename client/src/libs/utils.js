
import axios from "axios";

export const getDatabase = async () => {
  try {
    let res = await axios.get("http://localhost:8080");
    return res;
  } catch (error) {
    console.log("Error! D:");
    return error.response;
  }
};

export const createDatabase = async (id, name, table) => {
  try {
    let res = await axios.post("http://localhost:8080", {id: id, name : name, table: table});
    return res;
  } catch (error) {
    console.log("Error! D:");
    return error.response;
  }
};
