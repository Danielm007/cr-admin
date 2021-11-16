import axios from "axios";
import { toast } from "react-toastify";

export const loadImage = async (file) => {
  const formData = new FormData();
  formData.append("upload_preset", "cristo-rey");
  formData.append("file", file);

  try {
    toast.info("Subiendo Imagen...");
    const res = await axios.post(process.env.cloudinaryApi, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const url = res.data.secure_url;
    toast.success("Imagen subida! 😊");
    return url;
  } catch (error) {
    throw error;
  }
};
