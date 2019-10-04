const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3030';

const getNotes = async () => {
  try {
    const response = await axios.get('/initialNotes');
    const { data } = await response;
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addNotes = async value => {
  try {
    const response = await axios.post('/initialNotes', value);
    const { data } = await response;
    return data;
  } catch (err) {
    console.log(err);
  }
};

const delNotes = async id => {
  try {
    const response = await axios.delete(`/initialNotes/${id}`);
    const { data } = await response;
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getNotes, addNotes, delNotes };
