import { Home, Login } from '~/pages';

export const paths = {
    home: '/',
    login: '/login',
};

const routes = [
    {
        path: paths.home,
        element: Home,
        isPrivate: true,
    },
    {
        path: paths.login,
        element: Login,
        isPrivate: false,
    },
];

export default routes;
