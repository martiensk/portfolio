<template>
    <transition name="glitch" :duration="{leave: 0}">
        <router-view :nav-to="nextUrl" @nav="navigate"></router-view>
    </transition>
</template>

<script>
    import Audio from '../audioHandler';
    import Home from './home';
    import Terminal from './terminal';

    const audio = new Audio();

    export default {
        name: 'Main',
        components: {
            Home,
            Terminal
        },
        data () {
            return {nextUrl: ''};
        },
        computed: {
            audio () {
                return audio;
            }
        },
        methods: {

            /**
             * Navigates to /loading in order to display terminal scripts.
             * @param {string} path The URL that the /loading component should navigate to.
             * @returns {void}
             */
            navigate (path) {
                this.nextUrl = path;
                this.$router.push('/loading');
            },

            ambience () {
                if (!this.audio.ready) {
                    window.requestAnimationFrame(this.ambience);
                } else {
                    this.audio.play('hdd', 0.5);
                    this.audio.play('record', 0.25);
                }
            }
        },
        mounted () {
            this.ambience();
        }
    };
</script>