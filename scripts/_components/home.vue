<template>
    <div>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/loading">Terminal</router-link>
        </nav>
        <textarea :rows="selected.rows" :columns="selected.columns" v-model="selected.text"></textarea>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {full, mid, small} from '../ascii';

    export default {
        name: 'Home',
    
        /**
         * @description: Created the Vue data object
         * @returns {void}
         */
        computed: {
            ...mapGetters([
                'media'
            ]),
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

<style lang="scss" scoped>
    textarea {
        display: block;
        width: 380px;
        overflow: hidden;
        background: transparent;
        color: inherit;
        border: none;
        resize: none;
        user-select: none;
        cursor: default;
        pointer-events: none;
        animation: text-shadow 1s infinite;
    }
</style>