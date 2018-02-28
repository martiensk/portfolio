import Vuex from 'vuex';
import Vue from 'vue';

export default () => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {media: 'none'},
        mutations: {

            /**
             * Sets the device media parameter based on the screen size.
             * @param {object} state - The Vuex state
             * @param {number} mediaWidth - The width of the browser window.
             * @returns {void}
             */
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
