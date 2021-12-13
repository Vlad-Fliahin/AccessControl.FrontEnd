import React from 'react';
import sslChecker from "ssl-checker";

const Certificate = () => {
    const expiration_data = new Date('March 6, 2024')
    const ms = expiration_data - Date.now()
    const days_till_expiration = Math.floor(ms / (1000 * 3600 * 24))

    return (
        <div>
            <h1>
                Days till expiration: {days_till_expiration}
            </h1>
        </div>
    );
};

export default Certificate;