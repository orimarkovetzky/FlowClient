import axios from "./axiosInstance";

export const getAllMachines = async () => {
  const response = await axios.get("/machines");
  return response.data;
};

export const putReportError = async (id) => {
  const response = await axios.put(`/api/reportError`);

  return response.data;
};



