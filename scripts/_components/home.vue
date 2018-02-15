<template>
    <div>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/loading">Terminal</router-link>
        </nav>
        <textarea :rows="selected.rows" :columns="selected.columns" v-model="selected.text" disabled></textarea>
    </div>
</template>

<script>
    import {full} from '../ascii';

    export default {
        name: 'Home',
    
        /**
         * @description: Created the Vue data object
         * @returns {void}
         */
        data () {
            return {selected: full};
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
        animation: text-shadow 1s infinite;
    }
</style>