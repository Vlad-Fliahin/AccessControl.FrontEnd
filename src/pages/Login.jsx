import React, { useContext, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { AccessToken, AdminContext, AuthContext, I18nContext, RefreshToken, StaffContext, TContext, UserContext } from '../context';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Service from '../API/Service';

const Login = () => {
    let navigate = useNavigate();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const { isStaff, setIsStaff } = useContext(StaffContext);
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    const { userId, setUserId } = useContext(UserContext)
    const { t } = useContext(TContext)
    const { i18n } = useContext(I18nContext);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    async function login(event) {
        event.preventDefault()
        const response = await Service.getTokens(username, password);
        // console.log(typeof response);
        if (response.status == 200) {
            const tokens = response.data;
            setIsAuth(true);
            setAccessToken(tokens['access']);
            setRefreshToken(tokens['refresh']);
            localStorage.setItem('auth', true);

            const basic_user_info = await Service.getUserBasicInfo(tokens['access']);
            setUserId(basic_user_info['id']);

            const full_user_info = await Service.getUserFullInfo(tokens['access'], 
                                                                 basic_user_info['id']);
            setIsAdmin(full_user_info['is_staff']);
            if (full_user_info['is_staff'] == false) {
                localStorage.setItem('admin', true);
            }  
            
            full_user_info['is_staff']
                ?
                navigate("../database")
                :
                navigate("../home")
        }
    }

    return (
        <div>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                        {t('login.username')}
                    </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
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
                </Form.Group>
                <Button variant="primary" type="submit">
                    {t('navbar.login')}
                </Button>
            </Form>
        </div>
    );
};

export default Login;