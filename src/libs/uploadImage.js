import axios from "axios";
export const apiUploadImages = (file) =>
  axios.post("http://localhost:5000/api/upload/profile", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

