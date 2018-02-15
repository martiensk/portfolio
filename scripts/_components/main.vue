<template>
    <transition name="glitch" :duration="{leave: 0}">
        <router-view></router-view>
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
        }
    };
</script>