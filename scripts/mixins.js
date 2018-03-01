export default {
    methods: {

        /**
         * Emits a navigation event.
         * @param {string} path The path that react router should navigate to.
         * @fires Vue#emit
         * @returns {void}
         */
        navigate (path) {
            this.$emit('nav', path);
        }
    }
};
