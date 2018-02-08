<template>
    <div>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/test">Route One</router-link>
            <router-link to="/testtwo">Route Two</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import Test from './test';
    import TestTwo from './test2';
    import Loader from './loader';

    export default {
        name: 'Main',
        components: {
            Loader,
            Test,
            TestTwo
        }
    };
</script>