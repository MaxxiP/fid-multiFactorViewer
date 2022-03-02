import { useEffect, useState } from "react";

const EditUserList = (props) => {
    const [userList, setUserList] = useState(null)

    useEffect(() => {
        setUserList(props.userList)

    }, [props.userList])


    return (
        <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                userList ? (userList.map((user, index) => (
                <tr key={user.id}>
                    <td key={index}>{user.name}</td>
                    <td key={user.id} onClick={() => props.userRemoveHandler(user.id)}>Remove</td>
                </tr>
                ))) : null
            }
        </tbody>
    </table>
    )
}

export default EditUserList