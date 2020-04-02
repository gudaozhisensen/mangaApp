<template>
    <div class="update">
        <div class="header">
            <section id="topTitle">
            <div>
                <div class="btn_wrapper">
                    <div class="btn_box">
                       <van-button round type="info" id="fav" :class="{'tilteBtn_pre':status_hot,'tilteBtn':status_follw}"  @click="changeChanelFollow"><span class="text">关注</span></van-button>
                        <van-button round type="info" id="hot" :class="{'tilteBtn_pre':status_follw,'tilteBtn':status_hot}" @click="changeChanelHot"><span class="text">热门</span></van-button>
                    </div>
                </div>
            </div>
        </section>
        </div>
        
        <div class="contentWrapper">
            <div class="updateTab">
            <!-- favorite part -->
            <transition name="fade">
                <div class="favoritePart" ref="favorite">
                        <card-items :cardItemList="favData.fav"></card-items>
                </div>
             </transition> 
            <!-- hot part -->
            <transition name="fade">
            <div class="hotPart" ref="hot">
                    <van-tabs @click="datePost">
                        <van-tab title="今天" :data-index="0">
                            <card-items :cardItemList = "firstDayData.comicResult">{{firstDayData}}</card-items>
                        </van-tab>
                        <van-tab title="昨天" :data-index="1">
                            <card-items :cardItemList = "comicItemData.comicResult"></card-items>
                            </van-tab>
                        <van-tab v-for="index in 5" :title="'周 ' + today" :key="index" :data-index="index+1">
                            <card-items :cardItemList = "comicItemData.comicResult"></card-items>
                        </van-tab>
                    </van-tabs> 
            </div>
            </transition>        
            </div>
        </div>
        <footer-guide key-word="update"></footer-guide>
    </div>
</template>
<script>
import footerGuide from '../../../components/footer/footerGuide';
import cardItems from '../../../components/cardItem/cardItem';
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import axios from 'axios'
import api from '../../../assets/config/api';

Vue.use(Tab);
Vue.use(Tabs);

    export default {
        data() {
            return {
               favState:false,
               hotState:true,
               hotComics:{},
               firstDayData:{},
               favData:{},
               status_follw: false,
               status_hot: true,
               comicItemData:{},
               hotPartWidth:{
                    'transform' : 'translateX(-'+this.style+'px)'
               }
            }
        },
        async beforeCreate() {
            let data = await axios.get(api.hotComicsUrl+"/0");
            this.firstDayData = data.data;
            let fav = await axios.get(api.favUrl+"/1");
            this.favData = fav.data;
        },

        computed: {
                comicsList:function(){
                if(typeof this.hotComics.hotComics == 'object'){
                    return this.hotComics.hotComics;
                }else{
                    return [];
                }
            },
            today:function(){
                var today = new Date().getDay();
                switch (today-1){
                    case -1:
                        return "日";
                    case 0:
                        return "日";
                    case 1:
                        return "一";
                    case 2:
                        return "二";
                    case 3:
                        return "三";
                    case 4:
                        return "四";
                    case 5:
                        return "五";
                    case 6:
                        return "六";
                    
                }
                return today;
            },
            
            style:function(){
                let width = document.querySelector('body').clientWidth;
                console.log(width);
                return width;
            }
            
        },
        
        methods:{
            changeChanelFollow:function(){
            this.status_follw = true;
            this.status_hot = false;
            var favDom = document.querySelector('.favoritePart');
            var clientWidth = this.$refs.favorite.clientWidth;
            favDom.style.transform = "translateX(0px)";
            favDom.style.transitionDuration = 0.5+"s";

            var hotDom = document.querySelector('.hotPart');
            hotDom.style.transform = "translateX("+clientWidth+"px)";
            hotDom.style.transitionDuration = 0.5+"s";
        },
        changeChanelHot:function(){
            this.status_follw = false;
            this.status_hot = true;
            var favDom = document.querySelector('.favoritePart');
            var clientWidth = this.$refs.favorite.clientWidth;
            favDom.style.transform = "translateX(-"+clientWidth+"px)";
            favDom.style.transitionDuration = 0.5+"s";

            var hotDom = document.querySelector('.hotPart');
            hotDom.style.transform = "translateX(-"+clientWidth+"px)";
            hotDom.style.transitionDuration = 0.5+"s";

        },
        async datePost(e){
            if(e == 0){
                return;
            }else{
               let postData = {
                num: e
            }
            let result = await axios.get(api.hotComicsUrl+"/"+e);
            this.comicItemData = result.data;
            console.log(this.comicItemData);
            
            //axios post 方法
                // axios.get(api.hotComicsUrl+"/"+e,postData).then(res => {
                //         this.comicItemData =
                //         {
                //             state: "ok",
                //             result: res.data.comicResult
                //         }
                // })
                // .catch(function(error){
                //     console.log(error)
                // }) 
                }
            }
        },

        // watch: {
        //    "$route":{ 
        //        handler(route){
        //         const that = this;
        //         if(route.name == 'comicDetail'){
        //             console.log(route);
        //             this.$router.replace({
        //               path:route.path,
        //               name:"comicDetail"
        //           });
        //         }
                
        //     }}
        // },
        components: {
            footerGuide,cardItems
        }
    }
</script>


<style lang="less" scoped>
@mainColor :#ffcd2a;
    .header {
        height: 2.8rem;
    }
    #topTitle {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: @mainColor;
        height: 2.8rem;
    }
    .btn_wrapper {
        text-align: center;
        padding: 0.7rem 0;
    }
    .btn_box {
        width: 5.4rem;
        background-color: #280909;
        border-radius: 999px;
        margin: 0 auto;
    }
    .tilteBtn_pre {
        background-color: #280909;
        padding: 0;
        height: 1.6rem;
        width: 2.7rem;
        line-height: 0;
        border: 1px solid #280909;  

        .van-button__text {
            color: @mainColor;
            font-size: 0.75rem;
            font-weight: 500;
        }
    }
    .tilteBtn {
        background-color: @mainColor;
        padding: 0;
        height: 1.6rem;
        width: 2.7rem;
        line-height: 0;
        border: 1px solid #280909;
        // background-color: rgb(255, 251, 2);
    
        .van-button__text {
            color: #280909;
            font-size: 0.75rem;
            font-weight: 500;
        }
    }
    .contentWrapper {
        width: 100vw;
        margin-bottom: 3rem; 
        overflow: hidden;
        .updateTab {
            display: flex;
            width: 100vw;
            
            .favoritePart {
               transform : translateX(-100%);
            }
            .hotPart {
                .favoritePart;
                width: 100vw;
                .van-tabs {
                    width:100vw;
                }
            }
        }
    }
    
    .van-tabs--line .van-tabs__wrap {
        height: 2rem;

        .van-tab__text {
            font-size: 0.5rem;
        }
        .van-tabs__line {
            background-color: @mainColor;
        }
        .van-tab {
            line-height: 2rem;
        }
    }
    .van-tabs__wrap--scrollable .van-tab {
        flex: 0 0 16% !important;
        flex-basis: 16% !important;
    }
    .cardInfo {
        position: relative;
        color: #797171;
        font-size: 0.9rem;
        padding: 0.5rem 0.5rem 0; 
    }
    .latestChater {
        position: absolute;
        right: 0.8rem;
    }

    .fade-enter-active, .fade-leave-active {
        transition: 3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>