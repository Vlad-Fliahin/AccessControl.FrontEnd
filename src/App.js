import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavBarComp from './components/NavBarComp';
import './styles/App.css'
import AppRouter from './components/AppRouter';
import { AccessToken, AdminContext, AuthContext, I18nContext, RefreshToken, RoutesContext, StaffContext, TContext, UpdateContext, UserContext, VisibleContext } from './context';
import { useTranslation, Trans } from 'react-i18next';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [routes, setRoutes] = useState('');
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    if (localStorage.getItem('admin')) {
      setIsAdmin(true);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <AdminContext.Provider value={{
        isAdmin,
        setIsAdmin
      }}>
        <AccessToken.Provider value={{
          accessToken,
          setAccessToken
        }}>
          <RefreshToken.Provider value={{
            refreshToken,
            setRefreshToken
          }}>
            <TContext.Provider value={{
              t
            }}>
              <I18nContext.Provider value={{
                i18n
              }}>
                <RoutesContext.Provider value={{
                  routes,
                  setRoutes
                }}>
                  <UserContext.Provider value={{
                    userId,
                    setUserId
                  }}>
                    <StaffContext.Provider value={{
                      isStaff,
                      setIsStaff
                    }}>
                      <VisibleContext.Provider value={{
                        modal,
                        setModal
                      }}>
                        <UpdateContext.Provider value={{
                          update,
                          setUpdate
                        }}>
                          <BrowserRouter>
                            <NavBarComp />
                            <AppRouter />
                          </BrowserRouter>
                        </UpdateContext.Provider>
                      </VisibleContext.Provider>
                    </StaffContext.Provider>
                  </UserContext.Provider>
                </RoutesContext.Provider>
              </I18nContext.Provider>
            </TContext.Provider>
          </RefreshToken.Provider>
        </AccessToken.Provider>
      </AdminContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
