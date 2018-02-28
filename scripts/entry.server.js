import Vue from 'vue';
import Store from './store';
import Home from './_components/home';

const store = Store();

export default (context) => {
    const app = new Vue({
        render: (h) => { return h(Home); },
        store
    });
    return app;
};
