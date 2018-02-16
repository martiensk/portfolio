import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './router';
import Store from './store';
import Main from './_components/main';
import '../styles/critical.scss';
import '../styles/main.scss';
import {mapGetters} from 'vuex';

Vue.use(VueRouter);

const router = new VueRouter({routes: Routes});
const store = Store();

const app = new Vue({
    render: (h) => { return h(Main); },
    store,
    router,
    methods: {
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
