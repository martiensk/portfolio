<template>
    <div>
        <pre>{{selected.text}}</pre>
        <h1>I put symbols in the glow box.</h1>
        <br />
        <div>
            <span @click="navigate('/')" @mouseenter="borderize" @mouseleave="deborderize" id="about">About Me</span>
            <span @click="navigate('/')" @mouseenter="borderize" @mouseleave="deborderize" id="lab">The Lab</span>
            <span @click="navigate('/')" @mouseenter="borderize" @mouseleave="deborderize" id="tech">Tech Stack</span>
            <span @click="navigate('/')" @mouseenter="borderize" @mouseleave="deborderize" id="contact">Get In Touch</span>
        </div>
    </div>
</template>

<script>
    /**
     * @namespace Home
     */

    import {mapGetters} from 'vuex';
    import CSSRulePlugin from 'gsap/CSSRulePlugin';
    import {TweenMax} from 'gsap';
    import {full, mid, small} from '../ascii';
    import Mixin from '../mixins';

    export default {
        name: 'Home',
        mixins: [Mixin],
        computed: {
            ...mapGetters([
                'media'
            ]),

            /**
             * Returns ASCII art based on the screen media.
             * @returns {void}
             */
            selected () {
                switch (this.media) {
                case 'mobile':
                    return small;
                case 'tablet':
                    return mid;
                default:
                    return full;
                }
            }
        },
        methods: {
            borderize (e) {
                const pseudo = [CSSRulePlugin.getRule(`#${e.target.id}:before`), CSSRulePlugin.getRule(`#${e.target.id}:after`)];
                for (const rule of pseudo) {
                    TweenMax.set(rule, {
                        borderColor: '#14fdce',
                        onComplete () {
                            TweenMax.to(e.target, 0.3, {backgroundColor: 'rgba(1,119,95,0.3)'});
                            TweenMax.to(rule, 0.3, {width: e.target.clientWidth + 'px', height: e.target.clientHeight + 2 + 'px'});
                        }
                    });
                }
            },
            deborderize (e) {
                const pseudo = [CSSRulePlugin.getRule(`#${e.target.id}:before`), CSSRulePlugin.getRule(`#${e.target.id}:after`)];
                for (const rule of pseudo) {
                    TweenMax.to(e.target, 0.3, {backgroundColor: 'rgba(1,119,95,0)'});
                    TweenMax.to(rule, 0.3, {
                        width: '0px',
                        height: '0px',
                        onComplete () {
                            TweenMax.set(rule, {borderColor: 'transparent'});
                        }
                    });
                }
            }
        },
        mounted () {
            document.querySelectorAll('section div div span').forEach((element) => {
                TweenMax.set(CSSRulePlugin.getRule(`#${element.id}:before`), {width: '0px', height: '0px'});
                TweenMax.set(CSSRulePlugin.getRule(`#${element.id}:after`), {width: '0px', height: '0px'});
            });
        }
    };
</script>

<style lang="scss">
    @import '../../styles/responsive.scss';
    @import '../../styles/colors.scss';

    :global {
        textarea {
            animation: text-shadow 1s infinite;
        }
    }

    div {
        div {
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }

    textarea {
        display: block;
        width: 130px;
        overflow: hidden;
        background: transparent;
        color: inherit;
        border: none;
        resize: none;
        user-select: none;
        cursor: default;
        pointer-events: none;
    }

    h1 {
        font-size: 16px;
        margin: 0;
    }

    span {
        font-family: 'Bungee';
        font-size: 12px;
        padding: 4px 8px;
        margin: 8px;
        border: 2px solid $_terminal-inactive;
        cursor: pointer;
    }

    $class-list: '#about', '#lab', '#tech', '#contact';

    @each $class in $class-list {
        #{$class}:before, #{$class}:after {
            content:'';
            width:0px;
            height:0px;
            padding:0;
            margin:0;
        }

        #{$class}:before {
            position:absolute;
            top:-2px;
            left:-2px;
            border-left: 2px solid transparent;
            border-top: 2px solid transparent;
        }

        #{$class}:after {
            position:absolute;
            bottom:-2px;
            right:-2px;
            border-bottom: 2px solid transparent;
            border-right: 2px solid transparent;
        }
    }

    @include tablet {
        textarea {
            width: 380px;
        }
    }

    p {
        padding: 0;
        margin: 0;
    }

</style>