import Vuex from 'vuex';
import Vue from 'vue';

export default () => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {media: 'none'},
        mutations: {
            setmedia (state, mediaWidth) {
                if (Number(mediaWidth) < 475) {
                    state.media = 'mobile';
                } else if (Number(mediaWidth) < 1000) {
                    state.media = 'tablet';
                } else {
                    state.media = 'desktop';
                }
            }
        },
        getters: {
            media: (state) => {
                return state.media;
            }
        }
    });
};
