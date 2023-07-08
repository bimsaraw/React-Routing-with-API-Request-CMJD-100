import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";


const User = () => {
    const [users, setUsers] = useState(null);

    const userRequest = async () => {
        const res = await getUsers()
        await setUsers(res);
    }

    useEffect(() => {

        userRequest();
        
    },[]);

    return (
        <div>
            {users && users.map((user)=> {
                return (
                    <div>{user.username}</div>
                )
            })}
        </div>
    )
}

export default User;