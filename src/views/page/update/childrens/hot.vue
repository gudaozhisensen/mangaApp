<template>
    <div id="update_hot">
        <div class="contentWrapper">
            <div class="updateTab">
            <!-- favorite part -->
            <transition name="fade">
                <div class="favoritePart" ref="favorite">
                        <card-items></card-items>
                </div>
             </transition> 
            <!-- hot part -->
            <transition name="fade">
            <div class="hotPart" ref="hot">
                    <van-tabs @click="datePost">
                        <van-tab title="今天" :data-index="0">
                            <card-items :upadateTime="time" :cardItemList = "firstDay.result"></card-items>
                        </van-tab>
                        <van-tab title="昨天" :data-index="1">
                            <card-items :cardItemList = "comicItemData.result"></card-items>
                            </van-tab>
                        <van-tab v-for="index in 5" :title="'周 ' + today" :key="index" :data-index="index+1">
                            <card-items :cardItemList = "comicItemData.result"></card-items>
                        </van-tab>
                    </van-tabs> 
            </div>
            </transition>        
            </div>
        </div>
    </div>
</template>

<script>
import cardItems from '../../../../components/cardItem/cardItem';
import axios from 'axios';
    export default {
        data() {
            return {
               firstDay:{},
               comicItemData:{}
            }
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
                return width;
            },
            time:function(){
                var time = new Date();
                var year = time.getFullYear();
                var mouth = time.getMonth()+1;
                var date = time.getDate();
                let timeStr = year+"-0"+mouth+"-0"+date+" 00:00";
                return timeStr;
            }
            
        },
        methods: {
            datePost(e){
            console.log(api.hotComicsUrl+"/"+e);
            let postData = {
                num: e
            }
            axios.post(api.hotComicsUrl+"/"+e,postData).then(res => {
                    this.comicItemData =
                    {
                        state: "ok",
                        result: res.data.comicResult
                    }
                    console.log(this.comicItemData.result);
                
            })
            .catch(function(error){
                console.log(error)
            })
            }
        },
        async beforeCreate() {
            let data = await axios.get(api.hotComicsUrl+"/0");
            console.log(data.data);
            this.firstDay = {
                        state: "ok",
                        result: data.data
                    };
                    console.log(this.firstDay);
        },
        components: {
            cardItems
        }
    }
    
</script>