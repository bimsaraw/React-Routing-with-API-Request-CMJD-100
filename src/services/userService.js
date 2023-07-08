export const getUsers = async () => {
    try {
        const response = await fetch("http://localhost:9000/users"); //Getting users from the Backend we developed
        return await response.json(); //return as JSON
    } catch (error) {
        return error;
    }
}