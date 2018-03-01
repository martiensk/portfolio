<template>
    <div>
        <h1 >
            Swap Test
        </h1>
    </div>
</template>

<script>
    export default {
        name: 'Terminal',
        props: {
            navTo: {
                type: String,
                required: true
            }
        },
        mounted () {
            const component = this;
            setTimeout(() => {
                component.$router.push(component.navTo);
            }, 1000);
        }
    };
</script>