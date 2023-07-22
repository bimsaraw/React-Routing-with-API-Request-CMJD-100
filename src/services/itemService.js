import axios from "axios";

export const getItems = async () => {
    try {
        const response = await axios.get("http://localhost:9000/items");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}