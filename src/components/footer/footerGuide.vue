<template>
    <div id="footer">
        

       <section v-if="comicDetial" class="footerSection">
           <div  class="comicFooter">
            <div class="Group">
                <router-link to="/" data-id="0" >
                <section class="guide_item "><svg-icon iconClass="comment" class="comment"></svg-icon><p class="circle">圈子</p></section>
                </router-link>
            </div>
            
            <div class="fav">
                <router-link to="/" data-id="1" ><section class="guide_item">
                    <div class="itemContent">
                        <p class="collect">收藏</p><p class="count">1.5万</p>
                    </div>
                    </section></router-link>
            </div>
            
            <div class="continue">
                <router-link to="/" data-id="2" ><section class="guide_item "><p class="chapterBtn">续看第1话</p></section></router-link>
            </div>
        </div>   
       </section>


       <section v-else class="footerGuide">
           <router-link to="/" data-id="0" :updateData="firstDay.result"><section class="guide_item"><svg-icon :iconClass="keyWord=='update'?'update_active':'update'"  class="bottom_nav_icon"></svg-icon><p class="footerItemP" :class="keyWord=='update'?'active':''">更&nbsp;新</p></section></router-link>
           <router-link to="/update" data-id="1"><section class="guide_item active"><svg-icon :iconClass="keyWord=='home'?'home_active':'home'"  class="bottom_nav_icon"></svg-icon><p class="footerItemP" :class="keyWord=='home'?'active':''">首&nbsp;页</p></section></router-link>
            
            <router-link to="/bookself" data-id="2"><section class="guide_item"><svg-icon :iconClass="keyWord=='bookself'?'bookself_active':'bookself'"  class="bottom_nav_icon"></svg-icon><p class="footerItemP" :class="keyWord=='bookself'?'active':''">书&nbsp;架</p></section></router-link>
            <router-link to="/mine" data-id="3"><section class="guide_item"><svg-icon  :iconClass="keyWord=='mine'?'mine_active':'mine'" class="bottom_nav_icon"></svg-icon><p class="footerItemP"  :class="keyWord=='mine'?'active':''">我&nbsp;的</p></section></router-link>
       </section>
    </div>
</template>
 
<script>
import axios from 'axios';
import api from '../../assets/config/api';
export default {
    data() {
        return {
           firstDay:{}
        }
    },
    computed: {
        iconName: function(){
            return this.keyWord;
        },
    },
    async beforeCreate() {
            let data = await axios.get(api.hotComicsUrl+"/0");
            this.firstDay = {
                        state: "ok",
                        result: data.data
                    };
        },

    props:[
        'keyWord','comicDetial'
    ]
}
</script>

<style lang="less" scoped>
    #footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        
    }
    .footerSection {
        width: 100vw;
        border-top: 1px solid #cccccc;
    }
    .comicFooter {
        background-color: #efefef;
        width: 90vw;
        margin: 0 auto;
        display: flex;
        text-align: center;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .commonStyle {
            color: #333333; 
            padding: 1rem 0;
        }
            
        .Group {
            .commonStyle;
            flex: 1 0 2rem;
            font-weight: 600;
            .guide_item {
                text-align: left;
            }
                .comment {
                     width: 1.3rem;
                    height: 1.3rem;
                    color: #888888;
                }
                .circle {
                    color: #333333;
                }
        }
        .fav {
            flex: 1 0 3rem;
            .guide_item {
                color: #333333; 
                padding: 0.6rem 0 0.3rem 0;
                width: 6rem;
                background-color: #ededed;
                border-radius: 2rem;
                -webkit-box-shadow: 0px 2px 5px #cccccc;
                box-shadow: 0px 2px 5px #cccccc;
                margin-right: 1rem;
                .itemContent {
                    margin: 0 auto;
                    line-height: 1;
                    .collect {
                        font-weight: 600;
                    }
                }
                p{
                    font-size: 1rem;
                    color: #333333;
                }
                .count {
                    font-size: 11px;
                    margin-top: 4px;
                }
            }

        }
        .continue {
            flex: 1 0 1.8rem;
            .guide_item {
                .commonStyle;
                background-color: #df5d39;
                border-radius: 2rem;
                color: #ffffff;

                p {
                    font-size: 1rem;
                    margin: 0 auto;
                    line-height: 1;
                }
            }
        }
        
    }
    .footerGuide {
        background-color: #efefef;
        display: flex;
        height: 3rem;
    
    a {
        flex: 1;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #333333;
        }
    }
    .guide_item .active{
        color: #000;
    }
    .guide_item .footerItemP{
        font-size: 0.6rem;
        color: #909090;
        transform: scale(0.75);
    }
    .guide_item .chapterBtn{
        font-size: 0.6rem;
        color: #ffffff;
    }
    .active {
        color:#000000;
    }
    .bottom_nav_icon {
        width:1.4rem;
        height:1.4rem;
    }
</style>