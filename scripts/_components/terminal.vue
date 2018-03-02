<template>
    <div>
        <span v-for="(t, index) in display" :key="index">
            {{t}}
        </span>
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
        data () {
            return {
                text: [
                    'loading default SYS_BIOS.x1ee12k...',
                    'cm init mod navigation...',
                    'initializing stability kernal v61c-alpha...',
                    `loading subset ${this.navTo}...`,
                    'detecting available heapsize heapsize...',
                    'splitting modules...',
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    `${this.hash()}`,
                    'initialization complete'
                ],
                display: [],
                counter: 0,
                lastUpdate: null
            };
        },
        mounted () {
            this.counter = 0;
            console.log(this.text.length);
            this.populateDisplay();
        },
        methods: {
            gen (splice = false) {
                const string = `${Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)}`.toUpperCase();
                return splice ? `${string.slice(0, 2)} ${string.slice(2)}` : string;
            },
            hash () {
                return `0x${this.gen()}:${this.gen()} ${this.gen(true)} ${this.gen(true)} ${this.gen(true)} ${this.gen(true)}`;
            },
            populateDisplay () {
                if (this.lastUpdate === null) {
                    this.lastUpdate = new Date().getTime();
                    window.requestAnimationFrame(this.populateDisplay);
                } else if (Math.abs((this.lastUpdate - new Date().getTime()) / 1000) >= 0.3) {
                    if (this.counter < this.text.length) {
                        this.display.push(this.text[this.counter]);
                        this.lastUpdate = new Date().getTime();
                    } else if (this.counter >= this.text.length) {
                        this.$router.push(this.navTo);
                    }
                    this.counter += 1;
                    window.requestAnimationFrame(this.populateDisplay);
                } else {
                    window.requestAnimationFrame(this.populateDisplay);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    div {
        display: block;
        font-family: 'Fixedsys';
    }

    span {
        display: block;
        padding: 2px 0;
    }
</style>