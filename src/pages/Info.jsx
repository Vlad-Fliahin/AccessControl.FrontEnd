import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Service from '../API/Service';
import { AccessToken, AdminContext, AuthContext, I18nContext, RefreshToken, StaffContext, TContext, UserContext } from '../context';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';

const Info = () => {
    // const { isAuth, setIsAuth } = useContext(AuthContext);
    // const { isAdmin, setIsAdmin } = useContext(AdminContext);
    // const { isStaff, setIsStaff } = useContext(StaffContext);
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    const { userId, setUserId } = useContext(UserContext)
    const { t } = useContext(TContext)
    const { i18n } = useContext(I18nContext);
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    async function fetchUserData() {
        const response = await Service.getUserBasicInfo(accessToken, userId);
        console.log(response);
        setUserName(response['username']);
        setFirstName(response['first_name']);
        setLastName(response['last_name']);
        setEmail(response['email']);
        setPhoneNumber(response['phone_number']);
    }

    useEffect(() => {
        fetchUserData();
    }, [])
    
    
    async function updateUserInfo(event) {
        event.preventDefault();
        const response = await Service.updateCurrentUserInfo(accessToken, userId,
            firstName, lastName, email, phoneNumber);
        console.log(response)
        if ('status' in response) {
            alert("Updated!");
            setEmailError('');
            setPhoneNumberError('');
        }
        else {
            if ('email' in response) {
                setEmailError(response['email'][0]);
            }
            else {
                setEmailError('');
            }
            if ('phone_number' in response) {
                setPhoneNumberError(response['phone_number'][0]);
            }
            else {
                setPhoneNumberError('');
            }
        }
    }

    return (
        <div>
            <Form onSubmit={updateUserInfo}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>
                        {t('login.username')}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        placeholder=""
                        value={username}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>
                        {t('register.firstName')}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>
                        {t('register.lastName')}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                        {t('register.email')}
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {
                        emailError
                            ?
                            <span class="input-group-text" id="basic-addon1">{emailError}</span>
                            :
                            <></>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicphoneNumber">
                    <Form.Label>
                        {t('register.phoneNumber')}
                    </Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder=""
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    {
                        phoneNumberError
                            ?
                            <span class="input-group-text" id="basic-addon1">{phoneNumberError}</span>
                            :
                            <></>
                    }
                </Form.Group>
                <Button variant="primary" type="submit">
                    {t('database.save')}
                </Button>
            </Form>
        </div>
    );
};

export default Info;