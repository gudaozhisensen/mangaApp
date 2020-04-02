<template>
    <div id="mine">
        
            <div class="check_in" @click="checkIn" v-show="show" mode="out-in">
                <transition name="fade">
                    <div class="checkBook" ><svg-icon iconClass="sign" class="checkBookIcon"></svg-icon></div>
                </transition>
                <transition name="fade-bg">
                    <div class="check_bg"><span class="checkText">{{checkContent}}</span></div>
                </transition>                   
            </div>
        
        
        <div class="userInfo">
            <div class="userContent">
                <div class="user_avatar">
                    <van-image use-loading-slot round width="4rem" height="4rem" src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover"></van-image>
                </div>   
                <div class="infoContent">
                    <div class="user_name">gudaosensen</div>
                    <div class="user_vip">
                        <svg-icon iconClass="mouse" class="mouse"></svg-icon>
                            <div class="levelDes"><p class="desContent">Lv7 发烧友</p></div>
                    </div>
                    <div class="showMore">
                        <svg-icon iconClass="leftArrow_b" class="showMoreBtn"></svg-icon>
                    </div>
                    
                </div>
             <div class="van-hairline--bottom"></div>
            </div>

        <div class="userToolTab">
            <div class="userMes"><svg-icon iconClass="mesage" class="toolTabIcon"></svg-icon><p>消息</p><p>过来看看我</p></div>
            <div class="userCoin"><svg-icon iconClass="coins" class="toolTabIcon"></svg-icon><p>100硬币</p><p>填饱我的小金库</p></div>
        </div>  
        </div>

        <div id="signBookWrapper">
            <div class="noteBookMask" v-show="!show"></div>
            <div class="book" :class="animation?'book_animate_on':'book_animate_off'" >
                <ul class = "bottom">
                    <li ></li>
                    <li ></li>
                    <li ></li>
                </ul>
                <ul class = "front">
                    <li ></li>
                    <li ></li>
                    <li ></li>
                </ul>
                <ul class="cover">
                    <li></li>
                    <li></li>
                </ul>
                 <div @click="animationShow">
                    <svg-icon iconClass="out" class="iconOut"></svg-icon>  
                </div>


            </div>
                <div class="signContent" :class="animation?'coin_animate_on':'coin_animate_off'" >
                <div class="signStamp">
                        <div class="stampItem"><p class="signDate">今天</p>
                            <div class="stampContent"><span class="stampCoin">10积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                        <div class="stampItem"><p class="signDate">Day 2</p>
                            <div class="stampContent"><span class="stampCoin">20积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                        <div class="stampItem"><p class="signDate">Day 3</p>
                            <div class="stampContent"><span class="stampCoin">20积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                        <div class="stampItem"><p class="signDate">Day 4</p>
                            <div class="stampContent"><span class="stampCoin">10积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                        <div class="stampItem"><p class="signDate">Day 5</p>
                            <div class="stampContent"><span class="stampCoin">10积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                        <div class="stampItem"><p class="signDate">Day 6</p>
                            <div class="stampContent"><span class="stampCoin">10积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                        <div class="stampItem"><p class="signDate">Day 7</p>
                            <div class="stampContent"><span class="stampCoin">30积分</span><span><svg-icon iconClass="icon" class="coinIcon"></svg-icon></span></div>
                        </div>
                </div>
                </div>

        </div>



        <footer-guide key-word="mine"></footer-guide>
    </div>
</template>
<script>
import footerGuide from '../../../components/footer/footerGuide';
    export default {
        data() {
            return {
                checked: false,
                show:true,
                animation:false
            }
        },
        computed: {
            checkContent: function () {
               return this.checked?"已签":"签到"
            }
        },
        methods: {
            checkIn:function(){
                this.show=false;
                this.animation=true;
            },
            animationShow:function(){
                this.show=true;
                this.animation=false;
            }

        },
        components: {
            footerGuide
        }
    }
</script>
<style lang="less" scoped>
@import '../../../../public/css/signBookStyle.css';
    #mine {
        width: 100vw;
        position: relative;
        overflow: hidden;
        height:100vh;
    }
    .cardBg {
        position: absolute;
        background-image: url('../../../../public/images/cardBg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        width: 100vw;
        height: 11.4rem;
    }
    .check_in {
        position: absolute;
        top: 1rem;
        right: -1rem;
        .checkBook {
            position: absolute;
            top: -14px;
            left: 0px;

            .checkBookIcon {
                width: 3.4rem;
                height: 3.4rem;
            }
        }
        .check_bg {
            width: 7.5rem;
            height: 2rem;
            background-color: #f08383;
            border-radius: 2rem;

            .checkText {
                position: absolute;
                right: 2rem;
                top: 0.3rem;
                color: #ffffff;
                font-size: 0.9rem;
            }
        }
    }
    .user_avatar {
        margin: 0 auto;
        
    }
    .infoContent {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 1rem;
    }
    .showMore {
        flex: 0 0 2rem;
        text-align: right;

        .showMoreBtn {
            width: 0.5rem;
            height: 0.5rem;
            transform: rotateZ(180deg);
        }
    }
    .userContent {
        position: absolute;
        width: 86vw;
        margin-left: -43vw;
        left: 50%;
        top: -0.5rem;
        display: flex;
        padding-bottom: 0.5rem;
        .van-hairline--bottom {
            position: unset;
        }
    }

    .userInfo {
        position: absolute;
        left: 50%;
        margin-left: -45vw;
        margin-top: 4rem;
        z-index: 999;
        width: 90vw;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: -1px 1px 6px #ccc;
        .user_name,.user_vip {
            display:inline-block;
            font-weight: 600;
            font-size: 0.9rem;
        }
        .user_vip {
            font-size:0.5rem;
            padding: 0 1rem;
            transform: scale(0.8);
            font-weight: 400;
            color: #e0620d;
            position: relative;
            .mouse {
                width: 1.4rem;
                height: 1.4rem;
                position: absolute;
                top: -4px;
                left: 5px;
                z-index: 999;
                transform: rotateZ(-15deg);

            }
            .levelDes{
                height: 1rem;
                width: 4rem;
                background-color: #ffd79c;
                text-align: center;
                transform: skewX(-16deg);
                line-height: 1rem;
                padding-left: 0.3rem;
            }
            .desContent {
                transform: scale(0.8);
                font-weight: 600;
            }
        }
        
    }
    .userToolTab {
            display: flex;
            text-align: center;
            padding: 1rem 0;
            margin-top: 3.6rem;
            .userMes,.userCoin {
                flex: 1;
                font-size: 0.5rem;
                color: #666666;
                display: flex;
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
             
        }
        .fade-bg-enter-active, .fade-bg-leave-active {
            transition: opacity .5s;
        }
        .fade-bg-enter, .fade-bg-leave-to {
            opacity: 0;
            
        }

        .noteBookMask {
            width: 100vw;
            height: 100vh;
            background-color: #000;
            opacity: 0.5;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
        }
        #signBookWrapper {
            width: 100vw;
            height: 100vh;
           
        }
        .signContent{
            position: absolute;
            width: 80vw;
            height: 65vh;
            left: 50%;
            top: 50%;
            z-index: 1000;
            margin-left: -40vw;
            margin-top: -35vh;
            transform: rotate3d(2, 2, 0, 1deg);
        }
        .signStamp {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        .stampItem {
            flex: 0 1 8rem;
            height: 5.5rem;
            margin: 0.3rem;
            background-color: #fff5e5;
            border: 1px solid #f1eae0;
            border-radius: 5px;
        }
        .signDate {
            
        }
        .signDate,.stampCoin {
            font-size: 0.3rem;
            color: #d0c0a6;
            padding: 0.3rem;
        }
        .coinIcon {
            width: 3rem;
            height: 3rem;
        }
    .toolTabIcon {
        width: 1rem;
        height: 1rem;
    }

</style>    