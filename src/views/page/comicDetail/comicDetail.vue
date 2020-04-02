<template>
    <div id="comicDetail"  ref="comicDetail">

       <div class="detailContent">
            <header-guide :comicDetail="comicDetail.comicTitle" :state="attr" :opacity="opacity">
                <slot name="comicDetailTop"></slot>
            </header-guide>
           <div class="topBanner">
                <img :src="comicDetail.secondBanner">
           </div>
    <div class="contentWrapper">
        <div class="detailCard">
               <div class="comicDefaultPart">
                   <div class="titleLeftPart">
                       <p class="title" @click="goBack">{{comicDetail.comicTitle}}</p>
                       <div class="captionPart">
                           <span class="captionItem blood" v-if="titleName">{{titleName}}</span> 
                           <span class="captionItem pop" v-if="popular"><i class="pang-font">{{popular}}</i></span> 
                       </div>
                   </div>
                   <div class="van-hairline--left"></div>
                   <div class="titleRightPart">
                       <div class="rateNumber"><i class="web-font">{{comicDetail.rate}}</i></div>
                       <div class="rate">
                           <p class="stars"><van-rate allow-half :size="7"
  color="#ff440e" gutter="4" void-icon="star" void-color="#888888" v-model="rateValue" readonly /></p>
                           <p class="rateCount"><i class="pang-font">{{formateNumber(comicDetail.hotCounts)}}{{(comicDetail.hotCounts.toString().length)>4?"万人评分":"人评分"}}</i></p>
                       </div>
                   </div>
               </div>
               <transition name="fade">
                    <div class="showMoreBtn" @click="shwoMore" 
                    v-show="showBtn"><svg-icon iconClass="downArrow" class="downArrow"></svg-icon></div>
               </transition>
               <transition name="fade">
                   <div class="comicAddPart" v-show="show">
                   <div class="comicBrief">
                       <i class="pang-font"><span class="classTab">#{{comicDetail.category}}#</span><span class="lightColor">{{comicDetail.brief}}</span></i>
                    </div>
                   <div class="author"><i class="pang-font"><span class="lightColor">作者 : </span>{{comicDetail.author}}</i></div>
                </div>
               </transition>
           </div>

           <div class="chapterDetail">
               <div class="chapterTitle">
                   <p>{{state}}</p>
                   <p  v-if="allChapter == 0" class="endChapter"><span>暫無章節</span></p>
                   <p class="endChapter" @click="showListFuc" v-else>已更新至{{comicDetail.AllChapter}}话<span class="rightArrow"></span></p>
                   
               </div>

                <div class="scrollChapter">
                    <div v-if="allChapter == 0" class="failPart">
                       <svg-icon iconClass="tanQi" class="tanQi"></svg-icon>
                       <p>暂时没有收录哦~</p>
                    </div>
                    <div v-else>
                        <div class="scrollWrapper" :style="{width:scrollWidth+'px'}">
                        <div class="prevBtn directionIcon" @click="showListFuc">
                            <svg-icon iconClass="prev" class="prev"></svg-icon>
                            <p class="endChapter">查看更多</p>
                        </div>
                        <div class="chapterItem" v-for="(item,index) in allChapter" :key="index" ref="chapter">
                            <div class="chapterFirpic">
                                <div class="chapterBgimg" :style="{backgroundImage:'url('+item.firstPic+')'}"></div>
                            </div>
                            <div class="chapterContent">
                                <div class="chapterName">
                                    <div class="ellipsisText">{{item.chapter}}<span v-show="item.name"> - </span>{{item.name}}</div>
                                </div>
                                <div class="bottomPart">
                                    <span class="dayTime">{{formateDate(item.updateTime)}}</span>
                                    <div class="van-hairline--left"></div>
                                    <span class="guests"><svg-icon iconClass="upvote" class="upvote"></svg-icon>{{formateNumber(item.visitCounts)}}<span >{{(item.visitCounts.toString().length)>4?"万":""}}</span></span>
                                </div>
                            </div>
                        </div>
                        <div class="prevBtn directionIcon" @click="showListFuc">
                            <svg-icon iconClass="next" class="prev"></svg-icon>
                            <p class="endChapter">查看更多</p>
                        </div>
                    </div>
                    </div>
                    
                    

                </div>

           </div>

           <div class="rankList">
                <div class="chapterTitle">
                   <p>{{category}}排行榜</p>
                   <p class="endChapter">查看更多<span class="rightArrow"></span></p>
               </div>

               <div class="rankContent">
                   <div class="rankItem" v-for="(item,index) in rankData" :key="index">
                       <router-link :to="{path:'/mangaDetail/'+item.id}">
                           <div class="cover">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="title">
                            {{item.comicTitle}}
                        </div>
                       </router-link>
                        
                   </div>

               </div>
           </div>
           <div class="rankList">
                <div class="chapterTitle">
                   <p>喜欢这部作品的人也喜欢</p>
                   <p class="endChapter">查看更多<span class="rightArrow"></span></p>
               </div>

               <div class="randContent">
                   <div class="randItem" v-for="(item,index) in randData" :key="index">
                        <router-link :to="{path:'/mangaDetail/'+item.id}">
                            <div class="cover">
                                <img :src="item.cover" alt="">
                            </div>
                            <div class="title">
                                {{item.comicTitle}}
                                <p class="category">{{item.category}}</p>
                            </div>
                        </router-link>    
                   </div>

               </div>
           </div>
            <van-action-sheet v-model="menuShow" title="目录" @select="onSelect">
                <div class="menuContent">
                    <div class="chapterSelect">
                        <div class="selectLeft">
                            <span>全部章节({{comicDetail.AllChapter}})</span>
                        </div>
                        <div class="selectRight">
                            <span class="selectDesc" @click="descFuc" :class="showDesc?'active':''">正序</span> | 
                            <span class="selectAsc" @click="ascFuc" :class="showAsc?'active':''">倒序</span>
                        </div>
                       
                    </div>
                    <div class="actionSheet" v-for="(item,index) in DescAllChapter" :key="index+'Desc'" v-show="showDesc">
                        <div class="chapterFirpic">
                            <div class="chapterBgimg" :style="{backgroundImage:'url('+item.firstPic+')'}"></div>
                        </div>
                            <div class="chapterContent">
                                <div class="chapterName">
                                    <div class="ellipsisText">{{index+1}} - {{item.chapter}}<span v-show="item.name"> - </span>{{item.name}}</div>
                                </div>
                                <div class="bottomPart">
                                    <span class="dayTime">{{formateDate(item.updateTime)}}</span>

                                    <span class="guests"><svg-icon iconClass="upvote" class="upvote"></svg-icon>{{formateNumber(item.visitCounts)}}<span >{{(item.visitCounts.toString().length)>4?"万":""}}</span></span>
                                </div>
                            </div>
                    </div>

                    <div class="actionSheet" v-for="(item,index) in AscAllChapter" :key="index+'Asc'" v-show="showAsc">
                        <div class="chapterFirpic">
                            <div class="chapterBgimg" :style="{backgroundImage:'url('+item.firstPic+')'}"></div>
                        </div>
                            <div class="chapterContent">
                                <div class="chapterName">
                                    <div class="ellipsisText">{{index+1}} - {{item.chapter}}<span v-show="item.name"> - </span>{{item.name}}</div>
                                </div>
                                <div class="bottomPart">
                                    <span class="dayTime">{{formateDate(item.updateTime)}}</span>

                                    <span class="guests"><svg-icon iconClass="upvote" class="upvote"></svg-icon>{{formateNumber(item.visitCounts)}}<span >{{(item.visitCounts.toString().length)>4?"万":""}}</span></span>
                                </div>
                            </div>
                    </div>
                </div>
            </van-action-sheet>            
    </div>
           
       </div>
        <footer-guide comic-detial="comics"></footer-guide>
    </div>
</template>

<script>
import footerGuide from '../../../components/footer/footerGuide';
import headerGuide from '../../../components/header/headGuide';
import axios from 'axios'
import api from '../../../assets/config/api';
import Vue from 'vue';
import { Rate,ActionSheet,Toast } from 'vant';
Vue.use(Rate);
Vue.use(ActionSheet);
    export default {
        data() {
            return {
               comicDetail:{},
               allChapter:{},
               rateValue:0,
               titleName:{},
               popular:{},
               show:false,
               showBtn: true,
               state:{},
               category:{},
               rankData:{},
               randData:{},
               attr: true,
               opacity:0,
               scrollWidth:0,
               menuShow:false,
               DescAllChapter:{},
               AscAllChapter:{},
               showDesc:true,
               showAsc:false,
            }
        },

        computed: {
           
        },
       async beforeCreate() {
            // let data = await axios.post(api.detailUrl+"/"+this.$route.params.id);
            // let result = data.data.detail[0];
            // this.comicDetail = result;
            // this.rateValue = (result.rate)/2;
            // this.titleName = result.titleName;
            // this.popular = result.Popularity;
            // if(result.stateInfo == 0){
            //     this.state = "连载中";
            // }else if(result.stateInfo == 1){
            //     this.state = "已完结";
            // }
            axios.post(api.detailUrl+"/"+this.$route.params.id).then(res=>{
                var detailData = res.data;
                let result = detailData.detail[0];
                this.comicDetail = result;
                this.rateValue = (result.rate)/2;
                this.titleName = result.titleName;
                this.popular = result.Popularity;
                if(result.stateInfo == 0){
                    this.state = "连载中";
                }else if(result.stateInfo == 1){
                    this.state = "已完结";
                }
            })


            axios.post(api.AllchapterUrl+"/"+this.$route.params.id).then(res=>{
                var chapterData = res.data;
                this.allChapter = chapterData.allChapter;
                this.category = chapterData.category[0].category;
                this.rankData = chapterData.rankData;
                this.randData = chapterData.randData;
                this.DescAllChapter = chapterData.DescAllChapter;
                this.AscAllChapter = chapterData.AscAllChapter;
            })
            // var chapterData = await axios.post(api.AllchapterUrl+"/"+this.$route.params.id);
            // this.allChapter = chapterData.data.allChapter;
            // this.category = chapterData.data.category[0].category;
            // this.rankData = chapterData.data.rankData;
            // this.randData = chapterData.data.randData;
            // this.DescAllChapter = chapterData.data.DescAllChapter;
            // this.AscAllChapter = chapterData.data.AscAllChapter;
        },
        mounted() {
            window.addEventListener('scroll',this.handleScroll,true);
        },
        updated:function() {
            this.getWidth();
        },
        methods: {
            shwoMore:function(){
                this.show = true,
                this.showBtn = false
            },
            formateDate:function (datetime){
                function addDateZero(num) {
                    return (num < 10 ? "0" + num : num);
                }
                let d = new Date(datetime);
                //获取年的后两位
                var year = d.getFullYear();
                year = year < 2000 ? year + 1900 : year;
                var year2 = year.toString();
                var yy = year2.substr(2, 2);
                let formatdatetime = yy + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
                return formatdatetime;
            },
            formateNumber:function(num){
                if(num == undefined )
                return 145;
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
            },
            handleScroll:function(){
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight; 
                let el = this.$refs.comicDetail;
                var scrollTop = Math.max(document.documentElement.scrollTop, 
                document.body.scrollTop);
                if(scrollTop>10){
                    this.attr = false;
                    if(0<scrollTop<160){
                        this.opacity = scrollTop/170;
                    }
                    
                }else if(scrollTop<10) {
                    this.attr = true;
                }
 
            },

            getWidth:function(){
                if(this.$refs.chapter == undefined){
                    return;
                }else{
                    let dom = this.$refs.chapter[0];
                var width = window.getComputedStyle(dom).getPropertyValue("width");
                width = width.toString();
                var result = width.split('.')[0];
                this.scrollWidth = result*11.5;
                }
                
            },
            
            showListFuc:function(){
                this.menuShow = true
            },
            onSelect:function(){
                this.menuShow = false;
                // Toast(item.name);
            },
            descFuc:function(){
                this.showDesc = true;
                this.showAsc = false;
            },
            ascFuc:function(){
                this.showDesc = false;
                this.showAsc = true;
            },
            goBack:function(){
                this.$router.go(-1);
            }
        },
          beforeRouteEnter(to,from,next){
            console.log("from:",from);
            console.log("to:",to.params.id);
            next(vm => {
                console.log(vm);
                // vm.goBack();
                // 通过 `vm` 访问组件实例
            })
        },
        watch: {
           "$route":{ 
               handler(route){
                const that = this;
                if(route.name == 'comicDetail'){
                    // console.log(route);
                    this.$router.replace({
                      path:route.path,
                      name:"comicDetail"
                  });
                }
                
            }}
        },
        components:{
            footerGuide,headerGuide
        }
    }
</script>

<style lang="less" scoped>
@mianColor : #ff6c6c;
    .detailContent {
        margin-bottom: 6rem;
    }
    .topBanner {
        width: 100vw;

        img {
            width: 100%;
        }
    }
    .contentWrapper {
        position: relative;
    }
    .detailCard {
        width: 90vw;
        margin: -1.5rem auto 1.2rem;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 6px 9px 5px #cccccc;

        .showMoreBtn {
            width: 1.4rem;
            height: 0px;
            border-top: 0.6rem solid #ffffff;
            border-right: 0.8rem solid transparent;
            border-left: 0.8rem solid transparent;
            position: absolute;
            left: 50%;
            margin-left: -1.5rem;

            .downArrow {
                top: -1.2rem;
                left: 0.2rem;
                width: 1rem;
                height: 1rem;
                position: absolute;
            }
        }
    }
    .comicDefaultPart {
        display: flex;
        padding: 1rem;
        // padding: 2rem 1rem 1rem;
        .separateLine {
            width: 1px;
            height: 3rem;
            margin: auto 0;
            background-color: #dddddd;
        }
        .titleLeftPart {
            flex: 1;
            padding: 0 1rem;
            .title {
                font-size: 1.3rem;
                font-weight: 600;
                padding-bottom: 0.7rem;
            }
            .captionPart {
                -webkit-transform-origin-x: 0;
                transform: scale(0.75);
            }
            .captionItem {
                font-size: 12px;
                margin-right: 1rem;
            }
            .blood {
                padding: 4px 7px;
                background-color: @mianColor;
                color: #ffffff;
                border-radius: 3px;
            }
            .pop {
                padding: 0.3rem 0.5rem;
                border-radius: 5px;
                background-color: #d3d3d3;
                color: #888888;
            }
        }
        .titleRightPart {
            flex: 0 0 4.5rem;
            padding-left: 1.2rem;
            .rate {
                line-height: 0.8;
            }
            .rateNumber {
                color: @mianColor;
            }
            .rateCount {
                color: #888888;            
                -webkit-transform-origin-x: 0;
                transform: scale(0.85);
            }
            .rate .stars{
                -webkit-transform-origin-x: 0;
                transform: scale(0.75);
            }
        }
        
    }
    .comicAddPart {
        padding: 0rem 1.8rem 1.5rem;
        .comicBrief {
            line-height: 1.2;
        }
        
        .author {
            padding-top: 1rem;
        }
    }

    .chapterDetail, .rankList {
        margin: 0 auto;
        width: 90vw;
    }

    .lightColor {
            color: #595959;
        }
    .chapterTitle {
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .chapterTitle p:first-child{
        font-size: 1.1rem;
        font-weight: 700;
        color: #1c1c1c;
        flex: 1;
    }
    .chapterTitle .AllChapter {
        flex: 0 0 4.5rem;
    }
    .endChapter {
        color: #888888;
        font-size: 0.6rem;
    }
    .rightArrow {
        display :inline-block;
        position: relative;
        width: 1rem;
        height: 1rem;
    }
    span.rightArrow:after {
        display: inline-block;
        content: " ";
        height: 0.5rem;
        width: 0.5rem;
        border-width: 0.13rem 0.13rem 0 0;
        border-color: #888888;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -0.08rem;
    }
    .scrollChapter {
        width: 90vw;
        overflow: auto;
        
        .scrollWrapper {
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        .directionIcon {
            flex: 0 0 3.5rem;
            text-align: center;
            .prev {
                width: 2.1rem;
                height: 2.1rem;
                padding-bottom: 0.1rem;
            }
        }
        .chapterItem {
            flex: 0 0 8.5rem;
            padding: 1rem 0.3rem;
            img {
                width: 100%;
            }

            .chapterFirpic {
                width: 8.8rem;
            }
        .chapterBgimg {
            width: 100%;
            height: 5rem;
            background-size: cover;
            background-position: top;
            background-repeat: no-repeat;
            border-radius: 10px;
        }
        .chapterContent {
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 0.6rem;
            width: 7.5rem;
            overflow: hidden;

            .chapterName {
                font-size: 0.9rem;
            
               .ellipsisText {
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow:ellipsis;
                width: 90%;
                }
            }

            }  
        }
        .bottomPart {
            font-size: 0.1rem;
            color: #888888;
            padding-top: 0.2rem;;
            -webkit-transform-origin-x: 0;
            transform: scale(0.9);
            .dayTime {
                padding-right: 0.6rem;
            }
            .guests {
                padding-left: 0.6rem;
                .upvote {
                    height: 0.8rem;
                    width: 0.8rem;
                    padding-right: 4px;
                }
            }
        }
        
        .van-hairline--left {
            display: inline;
        }
       .van-hairline--left:after {
            border: 1px solid #cecece;
            transform: scale(.4);
        }
    }

    .rankList {
             overflow: auto;
         .rankContent {
            display: flex;
            padding: 0.6rem 0;
        } 
        .randContent{
            display: flex;
            width: 90vw;
            overflow: auto;
            padding: 0.6rem 0;
            .randItem {
                flex: 0 0 8.5rem;
                padding: 0.4rem;
            }
            .category {
                color: #888888;
            }
         }
        .rankItem {
            width: 30vw;
            padding: 0.4rem;
        }
        .cover img{
            width: 100%;
            border-radius: 5px;
            } 
        .title {
            font-size:0.78rem;
            color: #1c1c1c;
            }
        }
        
        .menuContent {
            width: 90vw;
            margin: 0 auto;
        }
        .chapterSelect {
            display: flex;
            .selectLeft,.selectRight {
                flex: 1;
            }
            .selectLeft {
                font-size: 1.2rem;
                font-weight: 600;
            }
            .selectRight {
                text-align: right;
                font-size: 0.9rem;
                 .active {
                color: red;
                }
                .selectDesc {
                    padding-right: 0.8rem;
                }
                .selectAsc {
                    padding-left: 0.8rem;
                }
            }

        }
        .actionSheet {
            display: flex;
            padding-top: 1rem;
            .chapterFirpic {
                flex: 0 0 10rem;
            }
            .chapterBgimg {
                width: 100%;
                height: 6rem;
                background-size: cover;
                background-position: top;
                background-repeat: no-repeat;
                border-radius: 3px;
            }
            .chapterContent {
                padding: 0.6rem 1rem;
                flex: 1;
                position: relative;
                .dayTime {
                    padding-right: 0.8rem;
                }
                .chapterName {
                    font-size: 1.2rem;
                    font-weight: 700;
                }
                .ellipsisText {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 12.5rem;
                }
                .bottomPart {
                    position: absolute;
                    bottom: 0.6rem;
                    color: #bbbbbb;
                }
            }
            svg.upvote{
                width: 1rem;
                height: 1rem;
                padding-right: 0.3rem;
            }          
        }
        .van-action-sheet__header {
            position: fixed;
            z-index: 999;
            width: 100vw;
            height: 4.5rem;
            background-color: #ffffff;
            border-radius: 10px;
            line-height: 3;
            font-size: 1.3rem;
            font-weight: 600;
        }  
        .van-action-sheet__content {
            margin-top: 4.5rem;
        }
        .failPart{
            display: flex;
            justify-content: center;
            align-items: center;
        }  
        .failPart >p{
            font-size: 1.2rem;
            font-weight: 700;
            color: #1c1c1c;
        } 
         svg.tanQi {
            width: 5rem;
            height: 6rem;
            padding: 1rem;
        }                                                 
    @font-face {
        font-family: 'webfont';
        font-display: swap;
        src: url('//at.alicdn.com/t/webfont_cde3jjn4427.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/webfont_cde3jjn4427.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('//at.alicdn.com/t/webfont_cde3jjn4427.woff2') format('woff2'),
        url('//at.alicdn.com/t/webfont_cde3jjn4427.woff') format('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/webfont_cde3jjn4427.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/webfont_cde3jjn4427.svg#庞门正道标题体2') format('svg'); /* iOS 4.1- */
    }
        .web-font{
        font-family:"webfont" !important;
        font-size:2rem;
        font-style:italic;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    @font-face {
        font-family: 'Hansfont';
        font-display: swap;
        src: url('//at.alicdn.com/t/webfont_rl1jib8opj.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/webfont_rl1jib8opj.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('//at.alicdn.com/t/webfont_rl1jib8opj.woff2') format('woff2'),
        url('//at.alicdn.com/t/webfont_rl1jib8opj.woff') f rmat('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/webfont_rl1jib8opj.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/webfont_rl1jib8opj.svg#NotoSansHans-DemiLight') format('svg'); /* iOS 4.1- */
    }
    .pang-font{
        font-family:"Hansfont" !important;
        font-size:0.1rem;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }   
    .fade-enter-active, .fade-leave-active {
        transition: 0.7s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>