import { Navigate } from "react-router";
import Certificate from "../pages/Certificate";
import Database from "../pages/Database";
import Home from "../pages/Home";
import Info from "../pages/Info";
import Login from "../pages/Login";
import Profiles from "../pages/Profiles";
import Register from "../pages/Register";
import Statistics from "../pages/Statistics";
import StudentsCount from "../pages/StudentsCount";

export const privateRoutes = [
    {path: '/home', element: Home, exact: true, tkey: 'navbar.home'},
    {path: '/info', element: Info, exact: true, tkey: 'navbar.info'},
    {path: '/stats', element: Statistics, exact: true, tkey: 'navbar.stats'},
    {path: '/living', element: StudentsCount, exact: true, tkey: 'navbar.living'},
]

export const publicRoutes = [
    {path: '/home', element: Home, exact: true, tkey: 'navbar.home'},
    {path: '/login', element: Login, exact: true, tkey: 'navbar.login'},
    {path: '/register', element: Register, exact: true, tkey: 'navbar.register'}
]

export const adminRoutes = [
    {path: '/certificates', element: Certificate, exact: true, tkey: 'navbar.certificates'},
    {path: '/database', element: Database, exact: true, tkey: 'navbar.database'},
    {path: '/profiles', element: Profiles, exact: true, tkey: 'navbar.profiles'},
]
