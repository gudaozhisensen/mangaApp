<template>
    <div id="search">
        <!-- <head-guide ></head-guide> -->
         <form action="/">
            <van-search
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
            />
         </form>
    </div>
</template>


<script>
import Vue from 'vue';
import { Search } from 'vant';
Vue.use(Search);
export default {
    data() {
        return {
        }
    },
    methods: {
        onSearch(){

        },
        onCancel(){
            
        }
    },
}
</script>