import axios from "axios";

const baseURL = "/api/persons";
// const baseURL = "https://thawing-wave-71967.herokuapp.com/api/persons";

const getAllContact = () => {
  const res = axios.get(baseURL).then((res) => res.data);
  return res;
};

const addContact = (contactObj) => {
  const res = axios.post(baseURL, contactObj);
  return res.then((res) => res.data);
};

const deleteContact = (id) => {
  const res = axios.delete(`${baseURL}/${id}`);
  return res.then((response) => response.data);
};

const updateContact = (id, updatedData) => {
  const res = axios.put(`${baseURL}/${id}`, updatedData);
  return res.then((response) => response.data);
};

const contact = {
  getAllContact,
  addContact,
  deleteContact,
  updateContact,
};

export default contact;
