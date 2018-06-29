<template>
    <section ref="section" @mousemove="interaction" @keypress.once="interaction" @scroll.once="interaction" @touchstart.once="interaction">
        <transition v-on:leave="navAnim">
            <router-view :nav-to="nextUrl" :is-navigating="isNavigating" @nav="navigate"></router-view>
        </transition>
        <span id="commandSpace" ref="commandSpace" v-html="commandText"></span>
        <settings></settings>
    </section>
</template>

<script>
    /* global Linear */
    /**
     * The main Vue component. Serves as a container for all other components.
     * @namespace Components.Main
     * @author Martiens Kropff
     */
    import TimelineMax from 'gsap/TimelineMax';
    import {TextPlugin} from 'TextPlugin'; // eslint-disable-line no-unused-vars
    import Audio from '../audioHandler';
    import Home from './home';
    import Terminal from './terminal';
    import Settings from './settings';
    import EventBus from '../eventBus';

    const audio = new Audio();

    export default {
        name: 'Main',
        components: {
            Home,
            Terminal,
            Settings
        },
        data () {
            return {
                nextUrl: '',
                popCounter: 0,
                lastPop: null,
                commandText: '~#',
                playing: false,
                isNavigating: false,
                interacted: false,
                interactionCount: 0
            };
        },
        computed: {
    
            /**
             * Returns the audio class
             * @returns {class} The audio class.
             */
            audio () {
                return audio;
            }
        },
        audio,
        methods: {

            /**
             * Listens for the first interaction on the document. This is because audio can't play in Chrome unless the user has already interacted with the document.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @returns {void}
             */
            interaction () {
                console.log('interaction');
                if (!this.interacted) {
                    this.interacted = true;
                }
                this.interactionCount += 1;
                this.$off('mousemove');
            },

            /**
             * Animation that plays whenever the router-view changes. Pretty cool, even if I say so myself.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @param {HTMLElement} el The element contained in the router-view.
             * @param {callBackFunction} done This callback function tells Vue that the transition is complete.
             * @returns {void}
             */
            navAnim (el, done) {
                new TimelineMax({
                    onStart: () => {
                        this.play('film');
                    },
                    onComplete: () => {
                        this.stop('film');
                        done();
                    }
                })
                    .set(el, {filter: 'brightness(30%)', autoAlpha: 1, scale: '1, 0.8', y: '0'})
                    .to(el, 0.200, {filter: 'brightness(120%) contrast(100%) saturate(30%)'})
                    .to(el, 0.200, {y: '100%', force3D: true})
                    .to(el, 0.008, {y: '-100%', force3D: true})
                    .to(el, 0.272, {autoAlpha: 0, scale: '1.3, 0.6', y: '100%', force3D: true})
                    .to(el, 0.200, {filter: 'brightness(0%) contrast(100%)', autoAlpha: 1, scale: '1, 1', y: '0%', force3D: true})
                    .set(el, {filter: 'brightness(100%) contrast(100%) saturate(100%)'});
            },

            /**
             * Navigates to /loading in order to display terminal scripts.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @param {string} path The URL that the /loading component should navigate to.
             * @returns {void}
             */
            navigate (path) {
                const route = this.$router.resolve({path});
                new TimelineMax({
                    onStart: () => {
                        this.play('typing');
                        this.isNavigating = true;
                    },
                    onComplete: () => {
                        this.stop('typing');
                        this.nextUrl = path;
                        this.$router.push('/loading');
                        this.isNavigating = false;
                    }
                })
                    .set(this.$refs.commandSpace, {text: `${this.commandText}`})
                    .to(this.$refs.commandSpace, 0.2, {autoAlpha: 1})
                    .to(this.$refs.commandSpace, 1, {text: `${this.commandText} init mod cd ~/${route.resolved.name}`, ease: Linear.easeNone})
                    .to(this.$refs.commandSpace, 0.2, {autoAlpha: 0});
            },

            /**
             * Starts the site ambience - an electronic humming with occasional pop. Meant to simulate a busted crt monitor.
             * @author Martiens Kropff
             * @memberOf Components.Main
             * @returns {void}
             */
            ambience () {
                if (!this.audio.ready || !this.interacted) {
                    window.requestAnimationFrame(this.ambience);
                } else if (!this.playing) {
                    this.play('humming', 0.8);
                    this.lastPop = new Date().getTime();
                    this.audio.repeat('record', false);
                    this.audio.repeat('borderButton', false);
                    this.makePop();
                    this.playing = true;
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
            EventBus.$on('play', (clip, volume = 1) => {
                this.play(clip, volume);
            });
            EventBus.$on('stop', (clip) => {
                this.stop(clip);
            });
        }
    };
</script>
<style lang="scss">
    #commandSpace {
        position: fixed;
        padding: 5px;
        bottom: 0;
        left: 0;
        z-index: 4;
        font-family: 'Fixedsys';
        font-size: 12px;
        opacity: 0;
    }
</style>