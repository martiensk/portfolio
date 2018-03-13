<template>
    <div>
        <textarea :rows="selected.rows" :columns="selected.columns" v-model="selected.text"></textarea>
        <h1>I put symbols in the glow box.</h1>
        <span @click.prevent="navigate('/')">TL;DR version</span>
    </div>
</template>

<script>
    /**
     * @namespace Home
     */

    import {mapGetters} from 'vuex';
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
        }
    };
</script>

<style lang="scss" module="home" scoped>
    @import '../../styles/responsive.scss';

    :global {
        textarea {
            animation: text-shadow 1s infinite;
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

    @include tablet {
        textarea {
            width: 380px;
        }
    }

</style>