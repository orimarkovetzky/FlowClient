export const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data.message || error.message);
  } else {
    console.error("Network Error:", error.message);
  }
};
