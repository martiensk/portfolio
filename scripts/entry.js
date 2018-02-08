import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './router';
import Main from './_components/main';

Vue.use(VueRouter);

const router = new VueRouter({routes: Routes});

/**
 * @description Creates a new Vue instance and with the Main component loaded - the main component being the one at /.
 * @returns {object} A new Vue instance.
 */
const MainComponent = () => {
    const app = new Vue({
        render: (h) => { return h(Main); },
        router
    });
    return app;
};

export default MainComponent;
