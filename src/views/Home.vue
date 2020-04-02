<template>
  <div class="home">
      <!-- <head-guide>
        <slot name='search'></slot>
      </head-guide> -->
      <div class="swipeWrapper">
        <van-icon name="search" id="search_icon" />
            <van-swipe :autoplay="4000" width="auto" height="auto" show-indicators>
              <van-swipe-item v-for="(image, index) in images" :key="index">
                <svg-icon iconClass="halfCicle" id="halfCicle" v-if="index == 1"></svg-icon>
                <img :src="image.banner_url" class="swiperImg"/>
              </van-swipe-item>
        </van-swipe>
       
      </div>
       <div class="tab_wrap">
            <ul class="tab-list">
                <li><a href=""><svg-icon iconClass="rank"  class="tabIcon"></svg-icon><p class="text">排行</p></a></li>
                <li><router-link to="/"><svg-icon iconClass="dairy"  class="tabIcon"></svg-icon><p class="text">更新</p></router-link></li>
                <li><a href=""><svg-icon iconClass="genres"  class="tabIcon"></svg-icon><p class="text">分类</p></a></li>
            </ul>
          </div>
      <div class="contentWrapper">
          <div class="mangaList">
            <div class="index-title-bar">
                <span>月榜</span>
            </div>  
            <div class="mangaList_track" ref="track">
              <div v-for="(item,index) in hotTop" :key="index" class="hotTopItem mangaList-item" ref="mangaItem" :data-index="index">
                <div class="contentCoverOverlay">
                  <!-- 加上一，二，三名的svg皇冠 -->
                  <svg-icon iconClass="no1" v-if="index == 0" class="SvgIconStyle"></svg-icon>
                  <svg-icon iconClass="no2" v-else-if="index == 1" class="SvgIconStyle"></svg-icon>
                  <svg-icon iconClass="no3" v-else-if="index == 2" class="SvgIconStyle"></svg-icon>
                  <img v-lazy="item.cover" class="contentCover"/>
                  <div class="item-bottomOverlay">
                    <p><a href="#">{{item.comicTitle}}</a></p>
                    <p class="chapterLink">最新 &nbsp;&nbsp; <router-link :to="{path:'/mangaDetail/'+item.id}">{{item.comicTitle}}<span>{{item.endChapter}}</span></router-link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
      <router-view></router-view>
    <footer-guide key-word="home"></footer-guide>
  </div>
</template>

<script>
// @ is an alias to /src
import footerGuide from '../components/footer/footerGuide';
import Vue from 'vue';
import axios from 'axios';
import { Col, Row, Swipe, SwipeItem, Lazyload, Icon } from 'vant';
import api from '../assets/config/api';
Vue.use(Col);
Vue.use(Row);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Icon);


export default {
  name: 'home',
  data() {
    return {
      data:{},
      hot:{},
      startX:"",
      startY:"",
        endX:"",
        endY:"",
       index:0
    }
  },
  computed: {
    images:function(){
      if(typeof this.data.banner=='object'){
        return this.data.banner;
      }else{
        return [];
      }
    },
    hotTop:function(){
      if(typeof this.hot.hot == 'object'){
        return this.hot.hot;
      }else{
        return [];
      }
    }
  },
  
  methods: {
    handleTouchStart:function(e){
      let index = 0;
     let touchData = {};
      var box = document.querySelector('.mangaList_track');
      var Width = this.$refs.mangaItem[0].clientWidth;
      e.preventDefault();//添加阻止click事件触发
      box.addEventListener('touchstart',function(e){
        this.touchStatus = true;
        if(isNaN(e.touches[0].clientX)){
            this.startX = 0;
        }else{
            touchData.startX = e.touches[0].clientX;
            touchData.startY = e.touches[0].clientY;
        }
      },false)
      box.addEventListener('touchmove',function(e){
            touchData.endX = e.touches[0].pageX;
            touchData.endY = e.touches[0].pageY;
          },false)
          
      box.addEventListener('touchend',function(e){
          e. preventDefault();
          var x = touchData.endX - touchData.startX;
          var y = touchData.endY - touchData.startY;
             if( (Math.abs(x) > Math.abs(y)) && Math.abs(x)>10){
             
              if(x>0){
                  
               if (index >= 1 && index <= 8) {
                   index++;
                   box.style.transform = "translateX("+Width*index+"px)";
                   box.style.transitionDuration = 0.5+"s";
               }
                console.log('向右滑动');
              }else{
                if (index >= 0 && index <= 8) {
                   index++;
                   box.style.transform = "translateX(-"+Width*index+"px)";
                   box.style.transitionDuration = 0.5+"s";
               }
                console.log('向左滑动');
              } 
             }
      },false)
     
    
     
    }
  },  

        watch: {
           "$route":{ 
               handler(route){
                const that = this;
                if(route.name == 'comicDetail'){
                    this.$router.replace({
                      path:route.path,
                      name:"comicDetail"
                  });
                }
                
            }}
        },
  components: {
    footerGuide
    // ,headGuide
  },
  async beforeCreate() {
    let result = await axios.get('http://localhost/index.php');
    console.log(result);
  },
  async mounted(){
    let banner = await axios.get(api.bannerUrl);
    this.data = banner.data;
    let hotdata = await axios.get(api.hotTopUrl);
    this.hot = hotdata.data;
  }
}
</script>

<style lang="less" scoped>
  body {
    background-color: #dfdfdf;
  }
  .van-swipe__indicators {
      bottom: 40px !important;
    }
  .swipeWrapper{
    position: relative;
  }
 .swiperImg{
   width: 100%;
   height: auto;
 }
 #search_icon {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 999;
    border: 1px solid rgba(228, 228, 228, 0.4);
    border-radius: 50%;
    font-size: 18px;
    background-color: rgba(228, 228, 228, 0.7);
    padding: 4px;
 }
 #halfCicle {
    position: absolute;
    bottom: 3px;
    z-index: 9;
    right: -0.3rem;
    width: 16em;
    height: 16rem;
 }
 .van-swipe__indicators {
   z-index: 999;
 }
 #top10 {
   position: relative;
   top: 0;
   left: 5px;
   width: 3.5rem;
 }
.tab_wrap {
    position: relative;
    width: 75%;
    margin: -2.2rem auto auto auto;
    z-index: 1;
}

.tab-list {
    display: flex;
    justify-content: space-between;
}
.van-swipe__indicators {
    bottom: 40px !important;
}
.tab-list li {
    margin:0 auto;
}
.tab-list li a {
    display: block;
    padding: 0.5rem;
    border-radius: 100%;
    background-color: #ffffff;
    text-align: center;
    height: 3.5rem;
    width: 3.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.tabIcon {
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    vertical-align: -0.15em;
}
p.text {
    font-size: 0.45rem;
    color: #666666;
}
 .mangaList {
   flex-direction: row;
   flex-wrap: wrap;
   padding: 5px;
   background-color: #ffffff;
   position: relative;
   overflow: hidden;
   cursor: grab;
 }

 .mangaList_track {
   width: 76rem;
   display: flex;

 }
    
.contentWrapper {
    height:100vh;
    width:100vw;
}
 .mangaList-item {
    margin: 0.1rem auto;
    width: 7.6rem;
    padding: 0.4rem ;
 }
 .contentCoverOverlay {
   position: relative;
   box-shadow: 3px 1px 10px #cccccc;
   
   .hotIcon {
     position: absolute;
     font-size: 30px;
     color: red;
     right: 0;
     top: 5px;
   }
 }
 .index-title-bar {
   padding:10px 5px 0 5px;
 }
 .mangaList-item img {
    width: 100%;
    border-radius: 10px;
   }
   .item-bottomOverlay {
     position: absolute;
     bottom: 0;
     height: 50px;
     width: 100%;
     background-color: #ffffff;
     p {
       font-size: 11px;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
       padding: 4px 4px 0 4px;
       
      a {
        text-decoration: none;
        color:#252525;
        font-weight: 700;
        }  
     }
     .chapterLink {
       font-weight: 500;
       color:#666666;
       a {
         font-weight: 500;
         color:#666666;
       }
     }
   }
  .SvgIconStyle {
    position: absolute;
    top: -24px;
    right: -18px;
    width: 2.5rem;
    height: 2.5rem;
    }

</style>