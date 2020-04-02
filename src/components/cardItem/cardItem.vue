<template>
    <div id="card">
        <div class="comicCard" v-for="(item,index) in cardItemList" :key="index">
            <div class="cardContent">
                <router-link :to="{path:'/mangaDetail/'+item.comic_id}">
                    <div class="titleContent">
                        <span class="comicTitle">{{item.comicTitle}}</span><p class="itemList" :key="index" v-show="item.category">{{item.category}}</p>
                        <div class="author">作者:{{item.author}}</div>
                    </div> 
                    <div class="imgItem">
                        <van-image use-loading-slot :src="item.secondBanner" fit="contain">
                            <van-loading slot="loading" type="spinner" size="20" vertical />
                        </van-image>
                    </div>
                </router-link> 
                    <div class="cardInfo"><span class="endChapter">{{item.endChapter}}</span> 
                    <div class="viewContent"><svg-icon iconClass="viewCount" class="viewCount"></svg-icon><span class="latestChater">&nbsp;{{formateNumber(item.hotCounts)}}<span >{{(item.hotCounts.toString().length)>4?"万":""}}</span></span></div></div>
            </div>
                           
        </div>               
    </div>
</template>

<script>


    export default {
        data() {
            return {
                hotComics:{}
            }
        },
        props: ['upadateTime','cardItemList'],

        computed: {
        
        },
        methods: {
            formateNumber:function(num){
                if(num == undefined )
                return 1156;
                else{
                    var length = num.toString().length;
                    if(length>4){
                    var processNum = num.toString().substring(0,3);
                    var dotFront = processNum.substring(0,1);
                    var dotBehind = processNum.substring(1,3);
                    var finishNum = dotFront+"."+dotBehind;
                     return finishNum;
                 }else{
                     return num;
                 }
                }
            }
        },

    }

</script>

<style lang="less" scoped>
        .titleContent .author {
            font-size: 0.9rem;
            color: #888888;
            padding: 0.4rem 0.5rem 0;
        }
        .comicCard {
        margin: 0.5rem 0;
        background-color: #ffffff;
        .cardContent {
            padding: 0.8rem 0;
            
            .comicTitle {
                font-size: 1rem;
                color: #2b2b2b;
                padding: 0 0.5rem;
            }
            .itemList {
                color: #666666;
                background-color: #fde0b2;
                display: inline-block;
                width: 2.9rem;
                height: 1.5rem;
                text-align: center;
                border-radius: 0.4rem;
                vertical-align: top;
            }
        }
        img {
            width: 100%;
        }
        .imgItem {
            margin-top: 0.5rem;
            width: 100vw;
            max-height: 15rem; 
        }
        }
    .van-image {
        display:block;
    }
    .cardInfo {
        display: flex;
        padding-top: 0.5rem;
    }
    .viewContent {
        display: flex;
    }
    .viewCount {
        width: 1rem;
        height: 1rem;
    }
    .endChapter, .latestChater {
        color: #888888;
        flex:1;
        padding: 0 0.5rem;
        align-items: center;
        font-size: 0.6rem;
    }
</style>