import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const client = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

export const auth = {
  login: async (email, password) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email, password, name) => {
    const response = await client.post('/auth/register', { email, password, name });
    return response.data;
  }
};

export const uploadFile = async (imageUri, token) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'document.jpg',
  });
  
  const response = await client.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getLetters = async (token) => {
  const response = await client.get('/letters', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data.letters;
};
