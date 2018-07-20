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
            transitions: true
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
             * Sets wether or not page transitions should happen
             * @memberOf Store
             * @author Martiens Kropff
             * @param {object} state The Vuex state
             * @param {Boolean} value True if transitions should happen, otherwise false.
             * @returns {void}
             */
            setTransitions (state, value) {
                if (typeof value === 'boolean') {
                    state.transitions = value;
                }
            }
        },
        getters: {
            media: (state) => {
                return state.media;
            },
            transitions: (state) => {
                return state.transitions;
            }
        }
    });
};
