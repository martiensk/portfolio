<template>
    <div>
        <svg ref="gear" @click="displaySettings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>
        <svg ref="volume" id="volume" @click="setVolume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.5 123">
            <path d="M72.3,120.69c-13-10.63-25.09-20.79-37.51-30.57a16.79,16.79,0,0,0-8.87-3.2c-7.45-.45-14.95-.14-22.84-.14V37.24c7.55,0,15-.18,22.43.08a13.64,13.64,0,0,0,9.88-3.61C47.1,23.84,59,14.21,70.87,4.5a7.35,7.35,0,0,1,1.43-.62Z"/>
            <path id="vol1" d="M121.71,61.71a61.59,61.59,0,0,1-16.89,42.52c-3.52,3.81-7,4.33-10,1.7s-2.83-6,.64-10c18.45-21.1,18.49-47.78.11-68.67-3.52-4-3.8-7.26-.87-10s6.56-2.22,10,1.49A61.92,61.92,0,0,1,121.71,61.71Z"/>
            <path id="vol2" d="M88.82,60.2c.06-6.42-2.7-13-7.68-18.74-3.38-3.91-3.54-7.46-.63-10s6.55-1.89,10,1.77C105,48.83,105,74.4,90.38,90c-3.4,3.62-7.25,4.3-9.95,1.52-3.16-3.27-2.36-6.43.42-9.68C86.78,74.84,88.85,69.28,88.82,60.2Z"/>
        </svg>
        <svg ref="transition" @click="setTransition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.9 199.8">
            <path id="transitions" d="M100,17.84A82,82,0,1,0,181.89,100,82.12,82.12,0,0,0,100,17.84ZM75,136.22,40.09,99.9,73.43,65l5.3,4.64L50.57,100.17,80.49,131.5ZM98.9,150.45l-8.59-1.21,14-98L113,52.45Zm28.91-14.23-5.3-4.64L150.68,101,120.75,69.71,126.27,65l34.89,36.32Z"/>
        </svg>
    </div>
</template>
<script>
/* global Expo */
/**
 * The settings Vue component. Allows the user to switch of animations, sounds, etc.
 * @namespace Components.Settings
 * @author Martiens Kropff
 */
import {TweenMax, TimelineMax} from 'gsap';
import {MorphSVG} from 'MorphSVG'; // eslint-disable-line no-unused-vars
import {mapGetters, mapMutations} from 'vuex';
import EventBus from '../eventBus';

export default {
    name: 'Settings',
    data () {
        return {
            display: false,
            paths: {
                vol1: 'M121.71,61.71a61.59,61.59,0,0,1-16.89,42.52c-3.52,3.81-7,4.33-10,1.7s-2.83-6,.64-10c18.45-21.1,18.49-47.78.11-68.67-3.52-4-3.8-7.26-.87-10s6.56-2.22,10,1.49A61.92,61.92,0,0,1,121.71,61.71Z',
                vol2: 'M88.82,60.2c.06-6.42-2.7-13-7.68-18.74-3.38-3.91-3.54-7.46-.63-10s6.55-1.89,10,1.77C105,48.83,105,74.4,90.38,90c-3.4,3.62-7.25,4.3-9.95,1.52-3.16-3.27-2.36-6.43.42-9.68C86.78,74.84,88.85,69.28,88.82,60.2Z',
                novol1: 'M102.92,57.92c4.51,4.58,13.33,13.31,13.33,13.31l7.7,7.23-8.82,8.83L73.85,45.8l8.91-8.5,5.3,5.54S96.48,51.52,102.92,57.92Z',
                novol2: 'M94.73,58.3c4.54-4.55,13.2-13.43,13.2-13.43l7.17-7.77,8.9,8.75L82.85,87.47l-8.57-8.85,5.5-5.34S88.38,64.79,94.73,58.3Z',
                transitions: 'M100,17.84A82,82,0,1,0,181.89,100,82.12,82.12,0,0,0,100,17.84ZM75,136.22,40.09,99.9,73.43,65l5.3,4.64L50.57,100.17,80.49,131.5ZM98.9,150.45l-8.59-1.21,14-98L113,52.45Zm28.91-14.23-5.3-4.64L150.68,101,120.75,69.71,126.27,65l34.89,36.32Z',
                noTransitions: 'M100,17.84A82,82,0,1,0,181.89,100,82.12,82.12,0,0,0,100,17.84ZM146.49,139.5l-7.5,7.34-39.25-38.6L57,143.13l-6.81-7.95,42-34.36L53.65,62.92l7.57-7.42L100.4,94.1,143,59.21l6.89,8L108,101.53Z'
            },
            mute: false
        };
    },
    computed: {
        ...mapGetters([
            'transitions'
        ])
    },
    methods: {
        ...mapMutations(['setTransitions']),

        displaySettings () {
            const t = new TimelineMax({
                onComplete: () => {
                    this.display = !this.display;
                }
            });
            if (!this.display) {
                t.to(this.$refs.gear, 0.8, {rotation: 180, transformOrigin: '50% 50%'})
                    .to(this.$refs.volume, 0.4, {autoAlpha: 1, rotation: 0, scale: 1, x: -60}, 0.2)
                    .to(this.$refs.transition, 0.4, {autoAlpha: 1, rotation: 0, scale: 1, x: -33, y: -44}, 0.4);
            } else {
                t.to(this.$refs.gear, 0.8, {rotation: 0, transformOrigin: '50% 50%'})
                    .to(this.$refs.volume, 0.4, {autoAlpha: 0, rotation: 270, scale: 0.5, x: 0}, 0.2)
                    .to(this.$refs.transition, 0.4, {autoAlpha: 0, rotation: 270, scale: 0.5, x: 0, y: 0}, 0.4);
            }
        },

        /**
         * Toggles wether or not audio is muted.
         * @namespace Components.Settings
         * @author Martiens Kropff
         * @returns {void}
         */
        setVolume () {
            this.mute = !this.mute;
            if (this.mute) {
                TweenMax.to('#vol1', 0.4, {morphSVG: this.paths.novol1, ease: Expo.easeOut});
                TweenMax.to('#vol2', 0.4, {morphSVG: this.paths.novol2, ease: Expo.easeOut});
                EventBus.$emit('mute');
            } else {
                TweenMax.to('#vol1', 0.4, {morphSVG: this.paths.vol1, ease: Expo.easeOut});
                TweenMax.to('#vol2', 0.4, {morphSVG: this.paths.vol2, ease: Expo.easeOut});
                EventBus.$emit('unmute');
            }
        },

        setTransition () {
            if (this.transitions) {

            } else {
            }
            this.setTransitions(!this.transitions);
        }
    },
    mounted () {
        TweenMax.set(this.$refs.volume, {rotation: 360, scale: 0.5, autoAlpha: 0, display: 'block'});
        TweenMax.set(this.$refs.transition, {rotation: 360, scale: 0.5, autoAlpha: 0, display: 'block'});
    }
};
</script>
<style lang="scss" scoped>
svg {
    position: fixed;
    bottom: 20px;
    right: 20px;
    fill: #14fdce;
    width: 24px;
    height: 24px;
    display: none;
    cursor: pointer;
}
svg:first-of-type {
    display: block;
}
#novol1, #novol2 {
    display: none;
}
</style>