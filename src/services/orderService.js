import axios from "axios";

export const createOrder = async (data) => {

    try {
        const response = await axios.post('http://localhost:9000/orders',data);
        return response.data;
    } catch (error) {
        console.log(error);   
    }
    


}