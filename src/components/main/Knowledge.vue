<template>
    <div>
        <div class="know_menu">
            <div class="menu_item" v-for="(item,index) in menu" :key="index" :class="index == activeItem?'active':''">
                <span class="cn_label" v-html="item.label"></span>
                <span class="en_label" v-html="item.en"></span>
            </div>
        </div>
        <div>
            <div class="know_group" v-for="(cate,index) in aquaculture" :key="index">
                <div class="group_title">
                    <span class="title_label" v-html="cate.label" style="font-size:18px"></span>
                    <span class="showMore" style="font-size:14px">查看更多</span>
                </div>
                <el-row :gutter="20" class="group_body">
                    <el-col :span="8" class="group_item" v-for="(item,index) in cate.children" :key="index">
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
                    {label:"养殖百科",value:"",en:"Aquaculture Encyclopedia"},
                    {label:"饲料库",value:"",en:"Feed storage"},
                    {label:"鱼药库",value:"",en:"Fish pharmacy store"},
                    {label:"种苗库",value:"",en:"Seedling nursery"},
                    {label:"综合知识",value:"",en:"Comprehensive knowledge"}
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
                ]

            }
        },
        methods:{
            overString(val){
                return val.length>45 && val.substring(0,45)+"..."
            }
        }
    }
</script>

<style scoped>
    .know_menu{
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

    .know_group .group_title{
        display:flex;
        justify-content:space-between;
        padding:20px 10px;
    }
    .know_group .group_body .group_item{
        display:flex;
        height:120px;
        overflow:hidden; 
        text-overflow:ellipsis;
    }
    .know_group .group_body .group_item .left{
        margin-right:16px;
    }
    .know_group .group_body .group_item .left img{
        width:100px;
        height:76px;
        border:1px solid #c7c7c7;
    }
    .know_group .group_body .group_item .right{
        display:flex;
        flex-direction:column;
    }
    .know_group .group_body .group_item .right .item_label{
        font-size:16px;
    }
    .know_group .group_body .group_item .right .item_content{
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3; 
        font-size:12px;
    }
   


</style>