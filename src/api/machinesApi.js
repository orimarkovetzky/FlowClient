import axios from './axiosInstance';

export const getAllMachines = async () => {
  const response = await axios.get('/machines');
  return response.data;
};

