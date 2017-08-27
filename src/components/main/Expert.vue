<template>
    <div>
        <div class="expert_menu">
            <div class="menu_item" 
                v-for="(item,index) in menu" 
                :key="index" 
                :class="index == activeItem?'active':''"
                @click="activeItem = index"
            >
                <span class="cn_label" v-html="item.label"></span>
                <span class="en_label" v-html="item.en"></span>
            </div>
        </div>
        <div v-if="activeItem == 0">
            <div class="expert_group">
                <el-row :gutter="20" class="group_body">
                    <el-col :span="12" class="group_item" v-for="(item,index) in expertList" :key="index">
                        <div class="left">
                            <div class="avatar">
                                <img :src="item.img" alt="">
                            </div>
                        </div>
                        <div class="right">
                            <div class="basic">
                                <span>姓名:{{item.name}}</span>
                                <span>邮件:{{item.email}}</span>
                            </div>
                            <div class="info">   
                                <span>单位:{{item.company}}</span>
                                <span>技术特长:{{item.speciality}}</span>
                                <span>职位:{{item.position}}</span>
                            </div>
                            <div class="introduc">
                                <span>简介:</span>
                                <p>{{overString(item.content)}}</p>
                            </div>
                            <div class="btn_group">
                                <a href="" class="video">&nbsp;</a>
                                <a href="" class="ask">&nbsp;</a>
                                <a href="" class="make">&nbsp;</a>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="activeItem == 1" >
            <div class="know_group" style="padding-top:50px;">
                <el-row :gutter="20" class="group_body">
                    <el-col :span="12" class="group_item" v-for="(item,index) in feedList" :key="index">
                        <div class="left">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="right">
                            <span class="item_label" v-html="item.label"></span>
                            <span class="item_content">{{overString(item.content)}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="activeItem == 2" >
            <div class="know_group" style="padding-top:50px;">
                <el-row :gutter="20" class="group_body">
                    <el-col :span="8" class="group_item" v-for="(item,index) in drugList" :key="index">
                        <div class="left">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="right">
                            <span class="item_label" v-html="item.label"></span>
                            <span class="item_content">{{overString(item.content)}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div>

        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeItem:0,
                menu:[
                    {label:"专家列表",value:"",en:"Aquaculture Encyclopedia"},
                    {label:"问题集萃",value:"",en:"Feed storage"},
                    {label:"我要提问",value:"",en:"Fish pharmacy store"}
                    
                ],
                aquaculture:[
                    {
                        label:"蟹类",
                        children:[
                            {label:"中华绒敖蟹",img:require("../../assets/knowledge/crab01.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"螃蟹",img:require("../../assets/knowledge/crab02.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽色彩缤纷，延续着春花之娇，，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"大螃蟹",img:require("../../assets/knowledge/crab03.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽色彩缤纷，延续着春花之娇，，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"中华绒敖蟹",img:require("../../assets/knowledge/crab01.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"螃蟹",img:require("../../assets/knowledge/crab02.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花色彩缤纷，延续着春花之娇，之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"大螃蟹",img:require("../../assets/knowledge/crab03.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏色彩缤纷，延续着春花之娇，花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"中华绒敖蟹",img:require("../../assets/knowledge/crab01.png"),content:"如期绽放，色彩缤纷，延续着春花之色彩缤纷，延续着春花之娇，娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"螃蟹",img:require("../../assets/knowledge/crab02.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，之丽，一朵一色妖貌动容。那些沉甸甸的秋绽放，色彩缤纷，延续着春花之娇，夏花色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，之丽，一朵一色妖貌动容。那些沉甸甸的秋绽放，色彩缤纷，延续着春花之娇，夏花色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，之丽，一朵一色妖貌动容。那些沉甸甸的秋绽放，色彩缤纷，延续着春花之娇，夏花色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"}
                        ]
                    },{
                        label:"虾类",
                        children:[
                            {label:"大虾",img:require("../../assets/knowledge/shrimp04.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"小虾",img:require("../../assets/knowledge/shrimp04.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"美人虾",img:require("../../assets/knowledge/shrimp08.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"对虾",img:require("../../assets/knowledge/shrimp07.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"虾",img:require("../../assets/knowledge/shrimp09.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"大虾",img:require("../../assets/knowledge/shrimp04.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"小虾",img:require("../../assets/knowledge/shrimp04.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"美人虾",img:require("../../assets/knowledge/shrimp08.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"对虾",img:require("../../assets/knowledge/shrimp07.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"虾",img:require("../../assets/knowledge/shrimp09.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"毛虾",img:require("../../assets/knowledge/shrimp11.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"}
                        ]
                    },{
                        label:"鱼类",
                        children:[
                            {label:"大鱼",img:require("../../assets/knowledge/fish13.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"小鱼",img:require("../../assets/knowledge/fish14.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"美人鱼",img:require("../../assets/knowledge/fish13.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"金龙鱼",img:require("../../assets/knowledge/fish15.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"鱼鱼",img:require("../../assets/knowledge/fish14.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"大鱼",img:require("../../assets/knowledge/fish13.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"小鱼",img:require("../../assets/knowledge/fish14.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"美人鱼",img:require("../../assets/knowledge/fish13.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"金龙鱼",img:require("../../assets/knowledge/fish15.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"鱼鱼",img:require("../../assets/knowledge/fish14.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"},
                            {label:"鱼大",img:require("../../assets/knowledge/fish13.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"}
                        ]
                    }
                ],
                feedList:this.utils.arrRepeat([
                    {label:"玉米胚胎",img:require("../../assets/knowledge/crab01.png"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"}
                ],23),
                drugList:this.utils.arrRepeat([
                    {label:"药品",img:require("../../assets/knowledge/crab02.jpg"),content:"如期绽放，色彩缤纷，延续着春花之娇，夏色彩缤纷，延续着春花之娇，色彩缤纷，延续着春花之娇，花之丽，一朵一色妖貌动容。那些沉甸甸的秋黄果色，肤泽更添光滑流金"}
                ],23),
                expertList:this.utils.arrRepeat([
                    {name:"王洪新",email:"whx@qq.com",company:"南京市水产中心",speciality:"产地环境安全质量及农业废弃资源",position:"水产技术员",content:"掌握扎实的数学、物理、化学等基本理论知识；掌握现代生物科学和环境科学的基本理论；掌握水产经济动植物的增养殖技术、营养与饲料和病害防治等方面的基本知识和基本技能；掌握主要养殖鱼类、甲壳类、藻类(可选择其中的2-3类)的人工育苗、育种和成体的集约化养殖等生产环节的技术关键；具备内陆水域、浅海、滩涂的渔业资源和环境调查与规划的基本方法，了解现代化养殖工程、海洋渔业和水产品加工利用的基本知识；具备农业可持续发展的意识和基本知识，了解水产增养殖学、生命科学的学科前沿和发展趋势。"}
                ])

            }
        },
        methods:{
            overString(val){
                return val.length > 70 ? val.substring(0,70)+"..." : val
            },
            //获取专家列表
            getExpertList(){
                const self = this;
                self.$.get("/IntelligentAgriculture/expert/expertList",function(res){
                    console.log(res)
                })
            },
            //获取问题列表
            getQsList(){
                const self = this;
                self.$.get("/IntelligentAgriculture/expert/getAllNewQuestions",{page:1},function(res){
                    console.log(JSON.parse(res))
                })
            },
            //获取热门问题
            getHotQsList(){
                const self = this;
                self.$.get("/IntelligentAgriculture/expert/getAllHostQuestions",{page:1},function(res){
                    console.log(JSON.parse(res))
                })
            }
        },
        mounted(){
            const self = this;
            self.getExpertList();
            self.getQsList();
            self.getHotQsList();
;        }
    }
</script>

<style scoped>
    .expert_menu{
        display:flex;
        justify-content:space-around;
        width:100%;
    }
    .menu_item{
        display:flex;
        flex-direction:column;
        padding:20px;
        text-align:center;
        cursor: pointer;
    }
    .menu_item:hover{
        color:#1cb4ad;
    }
    .menu_item.active{
        color:#1cb4ad;
    }
    .menu_item .cn_label{
        font-size:24px;
    }
    .menu_item .en_label{
        font-size:12px;
        font-family:'Cambria'
    }

    .expert_group .group_title{
        display:flex;
        justify-content:space-between;
        padding:20px 10px;
    }
    .expert_group .group_body .group_item{
        display:flex;
        margin-top:50px;
        padding-bottom:30px;
        min-height:120px;
        overflow:hidden; 
        text-overflow:ellipsis;
    }

    .expert_group .group_body .group_item .left{
        margin-right:16px;
    }
    .expert_group .group_body .group_item .left .avatar{
         width:170px;
         height:240px;
         background-color:#4c92e4;
    }
    .expert_group .group_body .group_item .left img{
        width:100%;
        height:100%;
       
    }
    .expert_group .group_body .group_item .right{
        display:flex;
        flex-direction:column;
    }
    .expert_group .group_body .group_item .right .item_label{
        font-size:16px;
    }
    .expert_group .group_body .group_item .right .item_content{
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
        font-size:12px;
    }
    .expert_group .group_body .group_item .right .basic{
        display:flex;
        justify-content:space-between;
    }
    .expert_group .group_body .group_item .right .info{
        display:flex;
        flex-direction:column;
    }
    .expert_group .group_body .group_item .right .info span{
        padding-top:10px;
    }
    .expert_group .group_body .group_item .right .introduc{
        padding-top:10px;
    }
    .expert_group .group_body .group_item .right .introduc span{
        font-size:14px;
    }
    .expert_group .group_body .group_item .right .introduc p{
        text-indent:2em;
    }
    .expert_group .group_body .group_item .right .btn_group{
        display:flex;
        justify-content:space-around;
        margin-top:10px;
    }
    .expert_group .group_body .group_item .right .btn_group a{
        width:61px;
        height:54px;
        background-position:center center;
        background-repeat: no-repeat;
        background-size:cover;
        text-decoration:none;
    }
    .expert_group .group_body .group_item .right .btn_group .video{
        background-size:45px 54px;
        background-image:url('../../assets/expert/icon1.png');
    }
    .expert_group .group_body .group_item .right .btn_group .ask{
        background-image:url('../../assets/expert/icon2.png');
    }
    .expert_group .group_body .group_item .right .btn_group .make{
        background-image:url('../../assets/expert/icon3.png');
    }



</style>
