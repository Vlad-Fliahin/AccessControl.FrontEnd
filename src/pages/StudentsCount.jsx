import React, { useContext, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import axios from 'axios';
import { AccessToken, I18nContext, RefreshToken, TContext } from '../context';
import Service from '../API/Service';

const StudentsCount = () => {
    const { t } = useContext(TContext);
    const { i18n } = useContext(I18nContext);
    const [studentsLiving, setStudentsLiving] = useState('')
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    
    async function fetchStudentsCount() {
        const living = await Service.getLiving(accessToken);
        console.log(living)
        setStudentsLiving(living['Living'])
    }
    
    return (
        <div>
            <h1>{t('students.count')}: {studentsLiving}</h1>
            <MyButton onClick={fetchStudentsCount}>Get</MyButton>
        </div>
    );
};

export default StudentsCount;