import axios from 'axios'
import React, { useContext } from 'react';
import { AccessToken, RefreshToken } from '../context';

export default class Service {
    static async getTokens(username, password) {
        const response = await axios.post(
            "http://127.0.0.1:8000/auth/jwt/create/",
            {
                "username": username,
                "password": password
            }
        )
        return response
    }
    static async verifyToken(accessToken) {
        const response = await axios.post(
            "http://127.0.0.1:8000/auth/jwt/verify/",
            {
                "token": accessToken,
            }
        )
        return response
    }
    static async getNewAccessToken(refreshToken) {
        const response = await axios.post(
            "http://127.0.0.1:8000/auth/jwt/refresh/",
            {
                "refresh": refreshToken,
            }
        )
        return response
    }
    static async getStats(startDate, endDate, accessToken) {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/get-statistics/",
            {
                params: {
                    start_date: startDate,
                    end_date: endDate
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    static async getLiving(accessToken) {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/get-living-students-count/",
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    static async getBackups(accessToken) {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/get-backups/",
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    static async backupDB(accessToken) {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/backup/",
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        // console.log(response)
        return response
    }
    static async restoreDB(accessToken, backup) {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/restore/",
            {
                "backup": backup
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response
    }
    static async getUserBasicInfo(accessToken) {
        const response = await axios.get(
            "http://127.0.0.1:8000/auth/users/me",
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    static async getUserFullInfo(accessToken, userId) {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/user/${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    static async register(username, password, rePassword, firstName, lastName, email, phoneNumber, isStaff) {
        var errors = {}
        const response = await axios.post(
            "http://127.0.0.1:8000/auth/users/",
            {
                "username": username,
                "password": password,
                "re_password": rePassword,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone_number": phoneNumber,
                "is_staff": isStaff,
            }
        ).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                errors = error.response.data;
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });

        if (Object.keys(errors).length === 0) {
            return response
        }
        return errors
    }
    static async createStudentFromUser(accessToken, userId) {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/student/`,
            {
                "user": userId,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response
    }
    static async createStaffFromUser(accessToken, userId) {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/staff/`,
            {
                "user": userId,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response
    }
    static async updateCurrentUserInfo(accessToken, userId, firstName, lastName, email, phoneNumber) {
        var errors = {};
        const response = await axios.put(
            `http://127.0.0.1:8000/auth/users/me/`,
            {
                // "id": userId,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone_number": phoneNumber,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        ).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                errors = error.response.data;
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });

        if (Object.keys(errors).length === 0) {
            return response
        }
        return errors
    }
    static async getUsers(accessToken) {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/user/',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        console.log(response);
        return response.data
    }
    static async updateUserInfo(accessToken, userId, username, password, firstName, lastName, email, phoneNumber) {
        var errors = {};
        const response = await axios.put(
            `http://127.0.0.1:8000/api/user/${userId}/`,
            {
                "username": username,
                "password": password,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone_number": phoneNumber,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        ).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                errors = error.response.data;
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
        if (Object.keys(errors).length === 0) {
            return response
        }
        return errors
    }
    static async deleteUser(accessToken, userId) {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/user/${userId}/`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        console.log(response);
        return response
    }
}