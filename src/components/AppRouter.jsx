import React, { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { AdminContext, AuthContext } from '../context';
import Login from '../pages/Login';
import { adminRoutes, privateRoutes, publicRoutes } from '../router';

const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);
    const { isAdmin } = useContext(AdminContext);
    // const isAuth = false;
    // console.log(isAuth)
    
    return (
        isAuth
            ?
            isAdmin
                ?
                <Routes>
                    {adminRoutes.map(route =>
                        <Route
                            element={<route.element />}
                            path={route.path}
                            exact={route.exact}
                            // key={Date.now()}
                        />
                    )}
                    <Route
                        // path="*"
                        element={<Navigate to="/database" />}
                    />
                </Routes>
                :
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            element={<route.element />}
                            path={route.path}
                            exact={route.exact}
                            // key={Date.now()}
                        />
                    )}
                    <Route
                        // path="*"
                        element={<Navigate to="/home" />}
                    />
                </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={<route.element />}
                        path={route.path}
                        exact={route.exact}
                        // key={Date.now()}
                    />
                )}
                <Route
                    // path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
    );
};

export default AppRouter;