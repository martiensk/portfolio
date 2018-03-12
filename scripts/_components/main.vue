<template>
    <section>
        <transition name="glitch" :duration="{leave: 0}">
            <router-view :nav-to="nextUrl" @nav="navigate" @play="play" @stop="stop"></router-view>
        </transition>
        <span ref="commandSpace" v-html="commandText"></span>
    </section>
</template>

<script>
    /**
     * The main Vue component. Serves as a container for all other components.
     * @namespace Components.Main
     * @author Martiens Kropff
     */
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
                lastPop: null,
                commandText: '~#<span class="blink">_</span>'
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
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @param {string} path The URL that the /loading component should navigate to.
             * @returns {void}
             */
            navigate (path) {
                const route = this.$router.resolve({path});
                console.log(route.resolved.name);
                console.log(this.$refs.commandSpace);
                this.nextUrl = path;
                this.$router.push('/loading');
            },

            /**
             * Starts the site ambience - an electronic humming with occasional pop. Meant to simulate a busted crt monitor.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @returns {void}
             */
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

            /**
             * This function creates an occasional popping sound for immersive purposes.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @returns {void}
             */
            makePop () {
                const time = new Date().getTime();
                const diff = Math.abs(time - this.lastPop);
                if (diff > this.popCounter) {
                    this.play('record', 0.5);
                    this.popCounter = (Math.random() * 5000) + 500;
                    this.lastPop = time;
                }
                window.requestAnimationFrame(this.makePop);
            },

            /**
             * This function plays an audio clip.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @param {string} clip The clip that should be played.
             * @param {number} [volume=1] The volume that the clip should be played at.
             * @returns {void}
             */
            play (clip, volume = 1) {
                this.audio.play(clip, volume);
            },

            /**
             * This function stops an audio clip that is playing.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @param {string} clip The clip that should be played.
             * @returns {void}
             */
            stop (clip) {
                this.audio.pause(clip);
            }
        },
        mounted () {
            this.ambience();
        }
    };
</script>
<style lang="scss">
    span {
        position: fixed;
        padding: 5px;
        bottom: 0;
        left: 0;
        z-index: 4;
        font-family: 'Fixedsys';
        font-size: 10px;

        .blink {
            animation: blink 0.8s infinite;
            position: relative;
        }
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        49.9% {
            opacity: 0
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
</style>