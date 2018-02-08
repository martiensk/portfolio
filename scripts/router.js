import Test from './_components/test';
import TestTwo from './_components/test2';
import Loader from './_components/loader';

export default [
    {
        path: '/',
        component: Loader
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/testtwo',
        component: TestTwo
    }
];
