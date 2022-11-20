import { Home, Login, Room } from '~/pages';

export const paths = {
    home: '/',
    login: '/login',
    room: '/room/:id',
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
    {
        path: paths.room,
        element: Room,
        isPrivate: false,
    },
];

export default routes;
