import Terminal from './_components/terminal';
import Home from './_components/home';

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/loading',
        component: Terminal
    }
];
