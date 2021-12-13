import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { AdminContext, AuthContext, I18nContext, TContext } from '../context';
import { Navigate, Routes, Route, Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { adminRoutes, privateRoutes, publicRoutes } from '../router';

const lngs = {
  en: { nativeName: 'English' },
  ua: { nativeName: 'Ukrainian' }
};

const NavBarComp = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  // const { t, i18n } = useTranslation();
  const { t } = useContext(TContext)
  const { i18n } = useContext(I18nContext);


  const logout = () => {
    setIsAuth(false);
    setIsAdmin(false);
    // console.log(isAuth)
    localStorage.removeItem('auth');
    localStorage.removeItem('admin');
    <Navigate to="/login" />
  }

  return (
    <Navbar class="d-flex flex-row" bg="dark" variant="dark">
      {console.log(isAuth)}
      {console.log(isAdmin)}
      <Container  >
        {
          isAuth
            ?
            isAdmin
              ?
              <Nav className="me-auto">
                {
                  adminRoutes.map(route =>
                    <Link style={{ padding: 10 }} to={route.path}>
                      {t(route.tkey)}
                    </Link>
                  )
                }
                <Button onClick={logout}>
                  {t('navbar.logout')}
                </Button>
              </Nav>
              :
              <Nav className="me-auto">
                {
                  privateRoutes.map(route =>
                    <Link style={{ padding: 10 }} to={route.path}>
                      {t(route.tkey)}
                    </Link>
                  )
                }
                <Button onClick={logout}>
                  {t('navbar.logout')}
                </Button>
              </Nav>
            :
            <Nav className="me-auto">
              {
                publicRoutes.map(route =>
                  <Link style={{ padding: 10 }} to={route.path}>
                    {t(route.tkey)}
                  </Link>
                )
              }
            </Nav>
        } 
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              type="submit"
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBarComp;