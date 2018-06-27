<template>
    <button ref="button" @mouseenter="borderize" @mouseleave="deborderize" @click="click">
        <div></div>
        {{buttonText}}
        <div></div>
    </button>
</template>

<script>
    /**
     * A button with a cool border effect. Vue component.
     * @namespace Components.BorderButton
     * @author Martiens Kropff
     */

    import {mapGetters} from 'vuex';
    import {TweenMax} from 'gsap';
    import Mixin from '../mixins';
    import EventBus from '../eventBus';

    export default {
        name: 'BorderButton',
        mixins: [Mixin],
        props: {
            buttonText: {
                type: String,
                required: true
            },
            isNavigating: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {divs: ''};
        },
        computed: {
            ...mapGetters([
                'media'
            ])
        },
        methods: {

            /**
             * Draws a border around the button on hover.
             * @namespace Components.BorderButton
             * @author Martiens Kropff
             * @param {Event} e The mouseenter event
             * @returns {void}
             */
            borderize (e) {
                if (!this.isNavigating) {
                    EventBus.$emit('stop', 'borderButton');
                    EventBus.$emit('play', 'borderButton', 0.1);
                    for (const div of this.divs) {
                        TweenMax.set(div, {
                            borderColor: '#14fdce',
                            onComplete () {
                                TweenMax.to(e.target, 0.4, {backgroundColor: 'rgba(1,119,95,0.2)', borderRadius: '0px'});
                                TweenMax.to(div, 0.4, {width: e.target.clientWidth + 3 + 'px', height: e.target.clientHeight + 3 + 'px'});
                            }
                        });
                    }
                }
            },

            /**
             * Removes the border around the button.
             * @namespace Components.BorderButton
             * @author Martiens Kropff
             * @param {Event} e The mouseleave event
             * @returns {void}
             */
            deborderize (e) {
                if (!this.isNavigating) {
                    for (const div of this.divs) {
                        TweenMax.to(e.target, 0.4, {backgroundColor: 'rgba(1,119,95,0)', borderRadius: '3px'});
                        TweenMax.to(div, 0.4, {
                            width: '0px',
                            height: '0px',
                            onComplete () {
                                TweenMax.set(div, {borderColor: 'transparent'});
                            }
                        });
                    }
                }
            },

            /**
             * Bubbles click event so that events are handled in the parent.
             * @namespace Components.BorderButton
             * @author Martiens Kropff
             * @param {Event} e The click event
             * @returns {void}
             */
            click (e) {
                this.$emit('click', e);
            }
        },
        mounted () {
            this.divs = this.$refs.button.getElementsByTagName('div');
            for (const div of this.divs) {
                TweenMax.set(div, {width: '0px', height: '0px'});
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/responsive.scss';
    @import '../../styles/colors.scss';

    button {
        background-color: transparent;
        color: $_terminal-text;
        display: inline-block;
        font-family: 'Bungee';
        font-size: 12px;
        padding: 4px 8px;
        margin: 8px;
        border-radius: 3px;
        border: 2px solid $_terminal-inactive;
        cursor: pointer;

        &:focus {
            outline: 0;
        }

        div {
            width:0px;
            height:0px;
            padding:0;
            margin:0;
            position:absolute;

            &:first-of-type {
                top:-2px;
                left:-2px;
                border-left: 2px solid transparent;
                border-top: 2px solid transparent;
            }

            &:last-of-type {
                bottom:-2px;
                right:-2px;
                border-bottom: 2px solid transparent;
                border-right: 2px solid transparent;
            }
        }
    }

</style>