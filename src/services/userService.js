import axios from 'axios';

export const getUsers = async () => {
    try {
        const response = await axios.get("http://localhost:9000/users");
        ////Getting users from the Backend we developed
        console.log(response);
        return await response.data; //return as JSON
        
    } catch (error) {
        return error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get("http://localhost:9000/users/"+id);
        return await response.data;
    } catch (error) {
        return error;
    }
}

export const createUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:9000/users",data);
        return await response.data;
    } catch (error) {
        return error;
    }
}