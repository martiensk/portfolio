<template>
    <transition name="glitch" :duration="{leave: 0}">
        <router-view :nav-to="nextUrl" @nav="navigate" @play="play" @stop="stop"></router-view>
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
            return {
                nextUrl: '',
                popCounter: 0,
                lastPop: null
            };
        },
        computed: {
            audio () {
                return audio;
            }
        },
        audio,
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
                    this.play('humming', 0.8);
                    this.lastPop = new Date().getTime();
                    this.audio.repeat('record', false);
                    this.makePop();
                }
            },
            makePop () {
                const time = new Date().getTime();
                const diff = Math.abs(time - this.lastPop);
                if (diff > this.popCounter) {
                    // this.play('record', 0.5);
                    this.popCounter = (Math.random() * 5000) + 500;
                    this.lastPop = time;
                }
                window.requestAnimationFrame(this.makePop);
            },
            play (clip, volume = 1) {
                this.audio.play(clip, volume);
            },
            stop (clip) {
                this.audio.pause(clip);
            }
        },
        mounted () {
            this.ambience();
        }
    };
</script>