import React, { useState, useContext } from 'react';
import { resolvePath } from 'react-router';
import MyButton from '../UI/button/MyButton';
import axios from 'axios'
import MyInput from '../UI/input/MyInput';
import Service from '../API/Service';
import { AccessToken, RefreshToken } from '../context';
import Plotly from 'plotly.js';


const Statistics = () => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [stats, setStats] = useState([])
    const { accessToken, setAccessToken } = useContext(AccessToken);
    const { refreshToken, setRefreshToken } = useContext(RefreshToken);

    async function fetchStatistics() {
        const verify = await Service.verifyToken(accessToken);
        if (verify.status != 200) {
            const newAccessToken = await Service.getNewAccessToken(refreshToken);
            if (newAccessToken.status == 200) {
                setAccessToken(newAccessToken.data['access'])
            }
        }
        const stats = await Service.getStats(startDate, endDate, accessToken);
        setStats(stats)
    }

    function draw() {
        var x = [];
        for (var i = 0; i < 500; i++) {
            x[i] = Math.random();
        }

        var trace = {
            x: x,
            type: 'histogram',
        };
        var data = [trace];
        Plotly.newPlot('myDiv', data);
    }

    return (
        <div>
            Stats
            <MyInput
                type="date"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                placeholder="Start date"
            />
            <MyInput
                type="date"
                pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                placeholder="End date"
            />
            <MyButton onClick={fetchStatistics}>Get</MyButton>
            {stats.map((room) =>
                <div>
                    {room.id}, {room.count}
                </div>
            )}
            {/* {draw()} */}
        </div>
    );
};

export default Statistics;