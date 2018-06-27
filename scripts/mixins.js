/**
 * A Vue mixin for properties that need to be shared between components.
 * @namespace Mixins
 * @author Martiens Kropff
 */

export default {
    methods: {

        /**
         * Emits a navigation event.
         * @memberOf Mixins
         * @author Martiens Kropff
         * @param {string} path The path that react router should navigate to.
         * @fires Vue#emit
         * @returns {void}
         */
        navigate (path) {
            this.$emit('nav', path);
        }
    }
};
