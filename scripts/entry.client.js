import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './router';
import Store from './store';
import Main from './_components/main';
import '../styles/critical.scss';
import '../styles/main.scss';

Vue.use(VueRouter);

const router = new VueRouter({routes: Routes});
const store = Store();

const app = new Vue({
    render: (h) => { return h(Main); },
    store,
    router,
    methods: {

        /**
         * Sends the width of the browser window to the Vuex store where the media string is updated accordingly.
         * @returns {void}
         */
        setMediaWidth () {
            this.$store.commit('setmedia', window.innerWidth);
        }
    },
    beforeMount () {
        this.setMediaWidth();
        window.addEventListener('resize', () => {
            this.setMediaWidth();
        });
    }
});
app.$mount('#app');
