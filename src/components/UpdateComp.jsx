import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Service from '../API/Service';
import { AccessToken, I18nContext, RefreshToken, TContext, UpdateContext, UserContext, VisibleContext } from '../context';

const UpdateComp = () => {
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    const { userId, setUserId } = useContext(UserContext);
    const { modal, setModal } = useContext(VisibleContext);
    const { t } = useContext(TContext);
    const { i18n } = useContext(I18nContext);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const {update, setUpdate} = useContext(UpdateContext);

    async function fetchUserData() {
        console.log(`fetch ${userId}`);
        const response = await Service.getUserFullInfo(accessToken, userId);
        console.log(response);
        setUserName(response['username']);
        setPassword(response['password']);
        setFirstName(response['first_name']);
        setLastName(response['last_name']);
        setEmail(response['email']);
        setPhoneNumber(response['phone_number']);
    }

    useEffect(() => {
        fetchUserData();
    }, [userId])
    
    async function updateUserInfo(event) {
        event.preventDefault();
        const response = await Service.updateUserInfo(accessToken, userId,
            username, password, firstName, lastName, email, phoneNumber);
        console.log(response)
        if ('status' in response) {
            setModal(false);
            setUpdate(true);
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

export default UpdateComp;