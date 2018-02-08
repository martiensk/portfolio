<template>
    <div>
        <h1>{{ greeting }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'TestTwo',
    
        /**
         * @description: Created the Vue data object
         * @returns {void}
         */
        data () {
            return {greeting: 'This is route 2'};
        }
    };
</script>