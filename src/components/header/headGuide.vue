<template>
    <div id="headGuide">
        <slot name="search"></slot>
        
        <slot name="updateTitle"></slot>

        <slot name="comicDetailTop">
            <section v-if="comicDetail" id="comicDetailTop">
                    <div class="staticPart">
                        <div class="detailContent">
                            <div class="leftBtn" @click="goBack">
                                <svg-icon iconClass="leftArrow_w" class="Arrow"></svg-icon>
                            </div>
                            <div class="comicTitle"></div>
                            <div class="rightBtn">
                                <svg-icon iconClass="downLoad_w" class="Arrow" ></svg-icon>
                                <svg-icon iconClass="share_w" class="Arrow"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div class="bgColor" v-show="!state" :style="{opacity:opacity}">
                        <div class="detailContent" >
                            <div class="leftBtn" @click="goBack">
                                <svg-icon iconClass="leftArrow_b" class="Arrow"></svg-icon>
                            </div>

                            <div class="comicTitle">{{comicDetail}}</div>
                            <div class="rightBtn">
                                <svg-icon iconClass="downLoad_b" class="Arrow"></svg-icon>
                                <svg-icon iconClass="share_b" class="Arrow"></svg-icon>
                            </div>
                        </div>
                    </div>
                
            </section>
        </slot>

        <section v-if="search">
             <div class="mask">
                <div id="search">
                    <form action="/">
                        <van-search shape = "round"
                            show-action = true
                            placeholder="请输入搜索关键词"
                            @search="onSearch"
                            @cancel="onCancel"
                        />
                    </form>
                </div>
            </div>
        </section>
        
        <section v-if="sign" id="topTitle">
            <div >
                <div class="btn_wrapper">
                    <div class="btn_box">
                        <router-link to=""><van-button round type="info" id="fav" :class="{'tilteBtn_pre':status_hot,'tilteBtn':status_follw}"  @click="changeChanelFollow"><span class="text">关注</span></van-button></router-link> 
                        <router-link to="" ><van-button round type="info" id="hot" :class="{'tilteBtn_pre':status_follw,'tilteBtn':status_hot}" @click="changeChanelHot"><span class="text">热门</span></van-button></router-link>
                    </div>
                   
                </div>
                
            </div>
        </section>


    </div>
</template>

<script>
import Vue from 'vue';
import { Search,Button } from 'vant';
Vue.use(Search);
Vue.use(Button);
export default {
    props:['search','sign','comicDetail','state','opacity'],
    data(){
        return{
            status_follw: false,
            status_hot: true
        }
    },
    methods: {
        onSearch(){

        },
        onCancel(){
            
        },
        changeChanelFollow:function(){
            this.status_follw = true,
            this.status_hot = false,
            this.$emit('favorite',this.status_follw,this.status_hot)
        },
        changeChanelHot:function(){
            this.status_follw = false,
            this.status_hot = true,
            this.$emit('hot',this.status_hot,this.status_follw)
        },
        goBack:function(){
            console.log("back");
            this.$router.go(-1);
        }
    },
   
}
</script>
<style lang="less" scoped>
@mainColor :#ffcd2a;
    #headGuide {
        height: auto;
        width: auto;
        position: absolute;
    }
    .mask {
        position: relative;
        width: 100%;
        height: 100%;
    }
    #search{
        width: 80%;
        position: absolute;
        top: 20px;
        z-index: 999;
        left: 10%;
    }
    .van-search {
        border-radius: 30px;
        padding: 6px 10px;
        background-color: #f7f8fa;
    }
    #topTitle {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: @mainColor;
        height: 2.8rem;
    }
    #comicDetailTop {
        width: 100vw;
        height: 3rem;
        
        .staticPart {
            position: absolute;
            background-color: transparent;
            width: 100%;
        }
        .bgColor {
             position: fixed;
             background-color: #efefef;
             z-index: 999;
             width: 100vw;
             box-shadow: 0px 1px 1px #dadada;
        }
        .detailContent {
            width: 90vw;
            margin: 0 auto;
            line-height: 2.8rem;
            display: flex;
        }
        .comicTitle {
            text-align: center;
            flex: 0 0 50%;
            color: #2c2c2c;
            font-weight: 700;
            font-size: 1.1rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 12.5rem;
        }
        .leftBtn, .rightBtn {
           flex: 0 0 25%;
        }
        .leftBtn {
            text-align: left;
        }
        .rightBtn {
            text-align: right;
        }

        .Arrow {
            width: 1.35rem;
            height: 1.35rem;
            vertical-align: middle;
            padding-right: 1rem;
        }
        .Arrow:last-child{
            padding-right: 0;
        }
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

</style>