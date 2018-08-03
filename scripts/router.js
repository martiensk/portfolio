/**
 * Vue router config.
 * @namespace Router
 * @author Martiens Kropff
 */

import Home from './_components/home';

/**
 * Dynamically imports Terminal component. This will cause it to be laxy-loaded by webpack.
 * @namespace Router
 * @author Martiens Kropff
 * @returns {void}
 */
const Terminal = () => { return import('./_components/terminal'); };

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
