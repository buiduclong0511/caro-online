import { Home, Login, Playground, Room } from '~/pages';

export const paths = {
    home: '/',
    login: '/login',
    room: '/room/:id',
    playground: '/playground/:id',
};

const routes = [
    {
        path: paths.home,
        element: Home,
    },
    {
        path: paths.login,
        element: Login,
    },
    {
        path: paths.room,
        element: Room,
    },
    {
        path: paths.playground,
        element: Playground,
    },
];

export default routes;
