<template>
    <div id="bookSelf" ref="bookSelf">
        <div class="trans" ref="trans" @click="togole(true)">sfasfafaffs</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        togole(val){
            console.log(this.$refs.bookSelf.style);
            // this.$refs.bookSelf
        }
    }
}

</script>
<style scoped>
    .bookSelf {
         perspective:300px;
        position: relative;
        transform-style: preserve-3d;
		transition: 1s all ease;
    }
    .trans{
        height: 200px;
        width: 200px;
        background-color: red;
        transform-style: preserve-3d;
        transition: 1s all ease;
    }
</style>