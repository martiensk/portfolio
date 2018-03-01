<template>
    <transition name="glitch" :duration="{leave: 0}">
        <router-view :nav-to="nextUrl" @nav="navigate"></router-view>
    </transition>
</template>

<script>
    import Home from './home';
    import Terminal from './terminal';

    export default {
        name: 'Main',
        components: {
            Home,
            Terminal
        },
        data () {
            return {nextUrl: ''};
        },
        methods: {
            navigate (path) {
                this.nextUrl = path;
                this.$router.push('/loading');
            }
        }
    };
</script>