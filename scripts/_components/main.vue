<template>
    <div :style="animation">
        <h1>{{ greeting }}{{dot}}<span class="b">{{transparentDot}}</span>{{char}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Main',
    
        /**
         * @description: Created the Vue data object
         * @returns {void}
         */
        data () {
            return {
                greeting: 'Coming Soon',
                dot: '',
                transparentDot: '...',
                char: '-',
                a: 0,
                b: 0,
                animation: 'animation: text-shadow 1.6s infinite, glitch 1s;'
            };
        },
    
        /**
         * @description Vue Created lifecycle hook
         * @returns {void}
         */
        created () {
            setInterval(() => {
                this.a = this.a === 3 ? 0 : this.a + 1;
                this.b = this.b === 2 ? 0 : this.b + 1;
                switch (this.a) {
                case 1:
                    this.dot = '.';
                    this.transparentDot = '..';
                    break;
                case 2:
                    this.dot = '..';
                    this.transparentDot = '.';
                    break;
                case 3:
                    this.dot = '...';
                    this.transparentDot = '';
                    break;
                default:
                    this.dot = '';
                    this.transparentDot = '...';
                    break;
                }
                switch (this.b) {
                case 0:
                    this.char = '-';
                    break;
                case 1:
                    this.char = '\\';
                    break;
                case 2:
                    this.char = '/';
                    break;
                default:
                    break;
                }
            }, 800);
            this.glitch();
        },

        methods: {

            /**
             * @description Create a CRT glitch effect
             * @returns {void}
             */
            glitch () {
                const seconds = Math.random() * 5;
                this.animation = this.animation === null ? 'animation: text-shadow 1.6s infinite, glitch 1s, flicker 0.5s infinite;' : null;
    
                setTimeout(() => {
                    this.glitch();
                }, seconds * 1000);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'styles/responsive.scss';

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    h1 {
        font-family: 'Exo 2', 'Courier', sans-serif;
        font-size: 125px;
    }

    @media (max-width: 480px) {

        h1 {
            font-size: 40px;
        }
    }

    /* @include tablet {
        h1 {
            font-size: 40px;
        }
    } */
</style>