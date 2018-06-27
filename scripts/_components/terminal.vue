<template>
    <div>
        <transition-group v-on:enter="animStart">
            <span v-for="(t, index) in display" :key="index">
                {{t}}
            </span>
        </transition-group>
    </div>
</template>

<script>
    /* global Linear */
    /**
     * The terminal Vue component. Shows a cool-ish terminal loading animation (inspired by Fallout).
     * @namespace Components.Terminal
     * @author Martiens Kropff
     */
    import {TweenMax} from 'gsap';
    import {TextPlugin} from 'TextPlugin'; // eslint-disable-line no-unused-vars
    import EventBus from '../eventBus';

    export default {
        name: 'Terminal',
        props: {
            navTo: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                text: [
                    'loading default SYS_BIOS.x1ee12k...',
                    'cm init mod navigation...',
                    'initializing stability kernal v61c-alpha...',
                    `loading subset ${this.navTo}...`,
                    'detecting available heapsize...',
                    'splitting modules...',
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    'initialization complete',
                    ''
                ],
                display: [],
                counter: 0,
                lastUpdate: null
            };
        },
        mounted () {
            setTimeout(() => {
                this.populateDisplay();
            }, 800);
            setTimeout(() => {
                EventBus.$emit('play', 'terminal', 0.5);
            }, 1000);
        },
        methods: {

            /**
             * Generates a four digit string.
             * @namespace Components.Terminal
             * @author Martiens Kropff
             * @param {bool} [splice=false] If true, the sptring is split into groups of two digits seperated by a space.
             * @returns {string} The result string.
             */
            gen (splice = false) {
                const string = `${Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)}`.toUpperCase();
                return splice ? `${string.slice(0, 2)} ${string.slice(2)}` : string;
            },

            /**
             * @namespace Components.Terminal
             * @author Martiens Kropff
             * Generates a string by calling the 'gen' function multiple times. It is meant to look like a RAM address.
             * Accuracy doesn't matter, it is for show only.
             * @returns {string} The generated string.
             */
            hash () {
                return `0x${this.gen()}:${this.gen()} ${this.gen(true)} ${this.gen(true)} ${this.gen(true)} ${this.gen(true)}`;
            },

            /**
             * Populates the 'terminal' with string to give a 'Linux-y' feel when transitioning Vue components.
             * @namespace Components.Terminal
             * @author Martiens Kropff
             * @returns {void}
             */
            populateDisplay () {
                if (this.lastUpdate === null) {
                    this.lastUpdate = new Date().getTime();
                    window.requestAnimationFrame(this.populateDisplay);
                } else if (Math.abs((this.lastUpdate - new Date().getTime()) / 1000) >= 0.3) {
                    if (this.counter < this.text.length) {
                        this.display.push(this.text[this.counter]);
                        this.lastUpdate = new Date().getTime();
                        this.counter += 1;
                        window.requestAnimationFrame(this.populateDisplay);
                    } else if (this.counter >= this.text.length) {
                        this.$router.push(this.navTo);
                    }
                } else {
                    window.requestAnimationFrame(this.populateDisplay);
                }
            },

            /**
             * Vue list transition - Incrementally displays string to the user.
             * @namespace Components.Terminal
             * @author Martiens Kropff
             * @param {HTMLElement} el The element that is being transitioned.
             * @param {callBackFunction} done Callback function to call when animation is done.
             * @returns {void}
             */
            animStart (el, done) {
                const html = el.innerHTML;
                el.innerHTML = '';
                TweenMax.to(el, 0.5, {
                    text: html,
                    ease: Linear.easeNone,
                    onComplete () {
                        done();
                    }
                });
            }
        },
        beforeDestroy () {
            this.counter = 0;
            this.display = [];
            this.lastUpdate = null;
            EventBus.$emit('stop', 'terminal');
        }
    };
</script>
<style lang="scss" scoped>
    div {
        display: block;
        font-family: 'Fixedsys';
    }

    span {
        display: block;
        padding: 2px 0;
        font-family: 'Fixedsys';
        font-size: 12px;
    }
</style>