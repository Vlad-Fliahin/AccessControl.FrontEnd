import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import Service from '../API/Service';
import { AccessToken, RefreshToken, UpdateContext, UserContext, VisibleContext } from '../context';
import MyModal from '../UI/MyModal/MyModal';

const Profiles = () => {
    const { userId, setUserId } = useContext(UserContext);
    const {modal, setModal} = useContext(VisibleContext);
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    const {update, setUpdate} = useContext(UpdateContext);
    const [usersList, setUsersList] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [staff, setStaff] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [userAdd, setUserAdd] = useState(false);

    async function fetchUsers() {
        const verify = await Service.verifyToken(accessToken);
        if (verify.status != 200) {
            const newAccessToken = await Service.getNewAccessToken(refreshToken);
            if (newAccessToken.status == 200) {
                setAccessToken(newAccessToken.data['access'])
            }
        }
        const users = await Service.getUsers(accessToken);
        console.log(users);
        setUsersList(users);
        setUpdate(false);
    }

    async function addUser() {
        setUserAdd(true);
        setModal(true);
        setUpdate(true);
    }

    async function editUser() {
        console.log(userId);
        setUserAdd(false);
        setModal(true);
        setUpdate(true);
    }

    async function deleteUser() {
        setModal(false);
        const response = await Service.deleteUser(accessToken, userId);
        if (response.status == 204) {
            alert("Deleted!");
            setUpdate(true);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [update])

    return (
        <div>
            <MyModal add={userAdd} ongoing={modal}></MyModal>
            <h1>Users</h1>  
            <ListGroup>
                <ListGroup.Item disabled variant="info">
                    Id, username, first_name, last_name, email, phone_number
                </ListGroup.Item>
                {
                    usersList.map(user =>
                        <ListGroup.Item action variant="info" onClick={e => setUserId(user['id'])}>
                            {`${user['id']}, ${user['username']}, ${user['first_name']}, 
                             ${user['last_name']}, ${user['email']}, ${user['phone_number']}`}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
            <Button
                variant="primary"
                onClick={addUser}
            >
                Add
            </Button>
            <Button
                variant="primary"
                onClick={editUser}
            >
                Edit
            </Button>
            <Button
                variant="primary"
                onClick={deleteUser}
            >
                Delete
            </Button>
        </div>
    );
};

export default Profiles;