import axios from "axios";

// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

const note = {
  getAll,
  create,
  update,
};

export default note;
