import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Service from '../API/Service';
import { AccessToken, AdminContext, AuthContext, I18nContext, RefreshToken, TContext, UpdateContext, UserContext, VisibleContext } from '../context';

const AddComp = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    const { userId, setUserId } = useContext(UserContext);
    const { modal, setModal } = useContext(VisibleContext);
    const { t } = useContext(TContext)
    const { i18n } = useContext(I18nContext);
    const { update, setUpdate } = useContext(UpdateContext);
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

    async function register(event) {
        event.preventDefault()
        const reg_response = await Service.register(username, password, rePassword,
            firstName, lastName, email, phoneNumber, staff)
        console.log(reg_response)
        if ('status' in reg_response) {
            setUsernameError('');
            setPasswordError('');
            setEmailError('');
            setPhoneNumberError('');

            const response = await Service.getTokens(username, password);
            console.log(response);
            const tokens = response.data;

            if (staff == true) {
                const staffResponse = await Service.createStaffFromUser(tokens['access'], reg_response.data['id'])
                console.log(staffResponse.data)
            }
            else {
                const studentResponse = await Service.createStudentFromUser(tokens['access'], reg_response.data['id'])
                console.log(studentResponse.data)
            }
            setModal(false);
            setUpdate(true);
            alert('Added!');
            // navigate('../login');
        }
        else {
            if ('username' in reg_response) {
                setUsernameError(reg_response['username'][0]);
            }
            else {
                setUsernameError('');
            }
            if ('password' in reg_response) {
                setPasswordError(reg_response['password'][0]);
            }
            else {
                setPasswordError('');
            }
            if ('email' in reg_response) {
                setEmailError(reg_response['email'][0]);
            }
            else {
                setEmailError('');
            }
            if ('phone_number' in reg_response) {
                setPhoneNumberError(reg_response['phone_number'][0]);
            }
            else {
                setPhoneNumberError('');
            }
        }
    }

    function rolePicker(role) {
        // console.log(role);
        if (role == "Student"){
            setStaff(false);
        }
        else {
            setStaff(true);
        }
    }

    return (
        <div>
            <Form onSubmit={register}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>
                        {t('login.username')}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    {
                        usernameError
                            ?
                            <span class="input-group-text" id="basic-addon1">{usernameError}</span>
                            :
                            <></>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                        {t('login.password')}
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {
                        passwordError
                            ?
                            <span class="input-group-text" id="basic-addon1">{passwordError}</span>
                            :
                            <></>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>
                        {t('register.confirmPassword')}
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder=""
                        value={rePassword}
                        onChange={e => setRePassword(e.target.value)}
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
                <Form.Group>
                    <select size="3" name="role" onChange={e => rolePicker(e.target.value)}>
                        <option disabled>Role</option>
                        <option value="Staff">Staff</option>
                        <option selected value="Student">Student</option>
                    </select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {t('navbar.register')}
                </Button>
            </Form>
        </div>
    );
};

export default AddComp;