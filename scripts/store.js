/**
 * Vuex setup.
 * @namespace Store
 * @author Martiens Kropff
 */
import Vuex from 'vuex';
import Vue from 'vue';

export default () => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            media: 'none',
            settings: {mute: false}
        },
        mutations: {

            /**
             * Sets the device media parameter based on the screen size.
             * @memberOf Store
             * @author Martiens Kropff
             * @param {object} state The Vuex state
             * @param {number} mediaWidth The width of the browser window.
             * @returns {void}
             */
            setMedia (state, mediaWidth) {
                if (Number(mediaWidth) < 475) {
                    state.media = 'mobile';
                } else if (Number(mediaWidth) < 1000) {
                    state.media = 'tablet';
                } else {
                    state.media = 'desktop';
                }
            },

            /**
             * Sets a specific setting.
             * @memberOf Store
             * @author Martiens Kropff
             * @param {object} state The Vuex state
             * @param {object} payload The payload should be an object containing two values - a 'key' dictating which setting to change and a value that it should be set to.
             * @returns {void}
             */
            setSetting (state, payload) {
                if (payload.key in state.settings) { state.settings[payload.key] = payload.value; }
            }
        },
        getters: {
            media: (state) => {
                return state.media;
            },
            settings: (state) => {
                return state.settings;
            }
        }
    });
};
