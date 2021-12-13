import Button from '@restart/ui/esm/Button';
import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Service from '../API/Service';
import { AccessToken, RefreshToken } from '../context';

const Database = () => {
    const [backups, setBackups] = useState([]);
    const [backup_name, setBackupName] = useState('');
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);
    const [update, setUpdate] = useState(true);

    async function fetchBackups() {
        const verify = await Service.verifyToken(accessToken);
        if (verify.status != 200) {
            const newAccessToken = await Service.getNewAccessToken(refreshToken);
            if (newAccessToken.status == 200) {
                setAccessToken(newAccessToken.data['access'])
            }
        }
        const backups = await Service.getBackups(accessToken);
        setBackups(backups);
        setUpdate(false);
    }

    async function backupDatabase() {
        // console.log(5);
        const verify = await Service.verifyToken(accessToken);
        if (verify.status != 200) {
            const newAccessToken = await Service.getNewAccessToken(refreshToken);
            if (newAccessToken.status == 200) {
                setAccessToken(newAccessToken.data['access'])
            }
        }
        const response = await Service.backupDB(accessToken);
        // console.log(response)
        if (response.status == 200) {
            setUpdate(true);
            alert('Database backuped!')
        }
    }

    async function restoreDatabase() {
        const verify = await Service.verifyToken(accessToken);
        if (verify.status != 200) {
            const newAccessToken = await Service.getNewAccessToken(refreshToken);
            if (newAccessToken.status == 200) {
                setAccessToken(newAccessToken.data['access'])
            }
        }
        const response = await Service.restoreDB(accessToken, backup_name);
        if (response.status == 200) {
            setUpdate(true);
            alert('Database restored!')
        }
    }

    useEffect(() => {
        fetchBackups();
    }, [update])

    return (
        <div>
            <h1>Backups</h1>
            <ListGroup>
                {
                    backups.map(backup =>
                        <ListGroup.Item action variant="info" onClick={e => setBackupName(backup)}>
                            {backup}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
            <Button 
                variant="primary"
                onClick={backupDatabase}
            >
                Backup
            </Button>
            <Button 
                variant="primary"
                onClick={restoreDatabase}
            >
                Restore
            </Button>
        </div>
    );
};

export default Database;