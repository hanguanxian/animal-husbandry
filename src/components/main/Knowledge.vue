<template>
    <div>
        <div class="know_menu">
            <div class="menu_item" 
                v-for="(item,index) in menu" 
                :key="index" 
                :class="index == activeItem?'active':''"
                @click="selectMenu(index)"
            >
                <span class="cn_label" v-html="item.label"></span>
                <span class="en_label" v-html="item.en"></span>
            </div>
        </div>
        <div v-if="activeItem == 0">
            <div v-if="!showProDetail" class="know_group" v-for="(cate,index) in product" :key="index">
                <div class="group_title">
                    <span class="title_label" v-html="cate.label" style="font-size:18px"></span>
                    <span class="showMore" style="font-size:14px">查看更多</span>
                </div>
                <el-row :gutter="20" class="group_body">
                    <el-col :span="8" class="group_item" v-for="(item,index) in cate.children" :key="index" @click.native="getProductDetail(item)">
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
            <div v-if="showProDetail">
                <el-row>
                    <el-col :span="18" :offset="2">
                        <el-button icon="arrow-left" @click="showProDetail = false">返回</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18" :offset="2">
                        <el-tabs v-model="proDetailAct">
                            <el-tab-pane label="基本介绍" name="product">
                                <el-card :body-style="{ padding: '10px' }" class="pro_card">
                                    <h3>{{proDetail.product.name}}</h3>
                                    <div class="card_body">
                                        <div class="left" style="margin-right:20px;">
                                            <img :src="proDetail.product.image" class="image" width="200"  height="200">
                                        </div>
                                        <div class="right">
                                            <p>[基本介绍]</p>
                                            <p class="text-indent:2em" v-html="proDetail.product.description"></p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="养殖技术" name="breed">
                                <el-collapse>
                                    <el-collapse-item  v-for="(item,index) in proDetail.breed" :title="item.title" :name="index" :key="index">
                                        <p style="text-indent:2em" v-html="item.content"></p>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-tab-pane>
                            <el-tab-pane label="病害防治" name="disease">
                                <el-collapse>
                                    <el-collapse-item  v-for="(item,index) in proDetail.disease"  :name="index" :key="index">
                                        <template slot="title">
                                            <img :src="item.image" alt="" width="30" height="30" style="vertical-align:middle;">
                                            {{item.diseasename}}
                                        </template>
                                        <h4>[原因]</h4>
                                        <p style="text-indent:2em" v-html="item.cause"></p>
                                        <h4>[症状]</h4>
                                        <p style="text-indent:2em" v-html="item.symptom"></p>
                                        <h4>[预防]</h4>
                                        <p style="text-indent:2em" v-html="item.treatment"></p>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="activeItem == 1" >
            <div v-if="!showFeedDetail" class="know_group" style="padding-top:50px;">
                <el-row :gutter="20" class="group_body">
                    <el-col :span="8" class="group_item" v-for="(item,index) in feedList" :key="index" @click.native="getFeedDetail(item)">
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
            <div v-if="showFeedDetail" class='feedDetail'>
                <el-row>
                    <el-col :span="18" :offset="2">
                        <el-button icon="arrow-left" @click="showFeedDetail = false">返回</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" :offset="6">
                        <h2 style="text-align:center;">{{feedDetail.name}}</h2>
                        <div class="info">
                            <div class="left">
                                <img :src="feedDetail.img" alt="" width="120" height="180">
                            </div>
                            <div class="right">
                                <div class="info_item">
                                    <span class="label">公司名称:</span> <span class="value">{{feedDetail.company}}</span>
                                </div>
                                <div class="info_item">
                                    <span class="label">联系人:</span> <span class="value">{{feedDetail.contact}}</span>
                                </div>
                                <div class="info_item">
                                    <span class="label">联系方式:</span> <span class="value">{{feedDetail.tel}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="introduc">
                            <h3>[基本介绍]</h3>
                            <p>{{feedDetail.content}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="activeItem == 2" >
            <div v-if="!showDrugDetail" class="know_group" style="padding-top:50px;">
                <el-row :gutter="20" class="group_body">
                    <el-col :span="8" class="group_item" v-for="(item,index) in drugList" :key="index" @click.native="getDrugDetail(item)">
                        <div class="left">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="right">
                            <span class="item_label" v-html="item.label"></span>
                            <span class="item_content" v-html="overString(item.content)"></span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div v-if="showDrugDetail" class='Detail'>
                <el-row>
                    <el-col :span="18" :offset="2">
                        <el-button icon="arrow-left" @click="showDrugDetail = false">返回</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" :offset="6">
                        <h2 style="text-align:center;">{{drugDetail.name}}</h2>
                        <div class="info">
                            <div class="left">
                                <img :src="drugDetail.img" alt="" width="120" height="180">
                            </div>
                            <div class="right">
                                <div class="info_item">
                                    <span class="label">药品类型:</span> <span class="value">{{drugDetail.drugType}}</span>
                                </div>
                                <div class="info_item">
                                    <span class="label">公司名称:</span> <span class="value">{{drugDetail.company}}</span>
                                </div>
                                <div class="info_item">
                                    <span class="label">联系人:</span> <span class="value">{{drugDetail.contact}}</span>
                                </div>
                                <div class="info_item">
                                    <span class="label">联系方式:</span> <span class="value">{{drugDetail.tel}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="introduc">
                            <h3>[基本介绍]</h3>
                            <p v-html="drugDetail.content"></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="activeItem == 3" >
            <div v-if="!showSeedDetail" class="know_group" style="padding-top:50px;">
                <el-row :gutter="20" class="seed_body">
                    <el-col :span="20" :offset="2" class="seed_item" v-for="(item,index) in seedList" :key="index" @click.native="getDrugDetail(item)">
                        <div class="left">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="center">
                            <h3>{{item.title}}</h3>
                            <p>种类:{{item.subKind}}</p>
                            <p style="text-indent:2em;" v-html="overString(item.content,170)"></p>
                        
                        </div>
                        <div class="right">
                            <p>{{item.location}}</p>
                            <p>{{item.company}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
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
                showProDetail:false,
                showFeedDetail:false,
                showDrugDetail:false,
                showSeedDetail:false,
                menu:[
                    {label:"养殖百科",value:"",en:"Aquaculture Encyclopedia"},
                    {label:"饲料库",value:"",en:"Feed storage"},
                    {label:"鱼药库",value:"",en:"Fish pharmacy store"},
                    {label:"种苗库",value:"",en:"Seedling nursery"},
                    {label:"综合知识",value:"",en:"Comprehensive knowledge"}
                ],
                product:[
                    {
                        label:"蟹类",
                        children:[]
                    },{
                        label:"虾类",
                        children:[]
                    },{
                        label:"鱼类",
                        children:[]
                    }
                ],
                proDetail:{
                    product:{},
                    breed:[],
                    disease:[]
                },
                proDetailAct:"product",
                feedList:[],
                feedDetail:{
                    name:"",
                    company:"",
                    contact:"",
                    tel:"",
                    content:""
                },
                drugList:[],
                drugDetail:{
                    name:"",
                    drugType:"",
                    company:"",
                    contact:"",
                    tel:"",
                    content:""
                },
                seedList:[],
                commonList:[],

            }
        },
        methods:{
            overString(val,len){
                len =  len ? len :45
                return val.length> len  ? val.substring(0,len)+"..." : val
            },
            //获取所有水产动物信息
            getProduct(req){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/productList",req,function(data){
                    data = JSON.parse(data);
                    if(data.resCode == 1){
                        for(const pro of self.product){
                            if(pro.label == req.subKind){
                                pro.children = [];
                                for(const item of data.res){
                                    pro.children.push({
                                        id:item.id,
                                        label:item.name,
                                        img:"http://210.28.188.103:8080/IntelligentAgriculture/res/"+item.image,
                                        content:item.description
                                    })
                                }
                            }
                        }
                    }else if(data.resCode == 0){
                        self.$message.error("获取"+req.subKind+"信息失败")
                    }
                })
            },
            getProductDetail(item){
                // console.log(item)
                const self = this;
                self.$.get("/IntelligentAgriculture/product/productDetail",{productid:item.id},function(data){
                    data = JSON.parse(data);
                    // console.log(data);
                    data.res.product.image  =  "http://210.28.188.103:8080/IntelligentAgriculture/res/"+data.res.product.image,
                    data.res.disease.map((item)=>{ item.image = "http://210.28.188.103:8080/IntelligentAgriculture/res/"+item.image}) 
                    self.proDetail.product = data.res.product;
                    self.proDetail.breed = data.res.breed;
                    self.proDetail.disease = data.res.disease;
                    self.proDetailAct  = "product";
                    self.showProDetail = true;
                })
            },
            //获取饲料
            getFeed(req){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/feedList",req,function(data){
                    data = JSON.parse(data);
                    self.feedList = []
                    for(const item of data.res){
                        self.feedList.push({
                            id:item.id,
                            label:item.name,
                            img:"http://210.28.188.103:8080/IntelligentAgriculture/res/"+item.image,
                            content:item.manualinstruct
                        })
                    }
                })
            },
            //获取饲料详情
            getFeedDetail(item){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/feedDetail",{productid:item.id},function(data){
                     data = JSON.parse(data);
                    //  console.log(data)
                     self.feedDetail.name = data.res.name;
                     self.feedDetail.company = data.res.company;
                     self.feedDetail.tel = data.res.telphone;
                     self.feedDetail.contact = data.res.contact;
                     self.feedDetail.content = data.res.manualinstruct;
                     self.feedDetail.img = "http://210.28.188.103:8080/IntelligentAgriculture/res/"+data.res.image
                     self.showFeedDetail = true;
                })
            },

            //获取鱼药
            getDrug(req){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/drugList",req,function(data){
                    data = JSON.parse(data);
                    self.drugList = []
                    for(const item of data.res){
                        self.drugList.push({
                            id:item.id,
                            label:item.name,
                            img:"http://210.28.188.103:8080/IntelligentAgriculture/res/"+item.image,
                            content:item.manualinstruct
                        })
                    }
                })
            },
            //获取鱼药详情
            getDrugDetail(item){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/drugDetail",{productid:item.id},function(data){
                    data = JSON.parse(data);
                    self.drugDetail.name = data.res.name;
                    self.drugDetail.drugType = data.res.type;
                    self.drugDetail.company = data.res.company;
                    self.drugDetail.tel = data.res.telphone;
                    self.drugDetail.contact = data.res.contact;
                    self.drugDetail.content = data.res.manualinstruct;
                    self.drugDetail.img = "http://210.28.188.103:8080/IntelligentAgriculture/res/"+data.res.image
                    self.showDrugDetail = true;
                })
            },
            //获取种苗
            getSeed(req){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/seedList",req,function(data){
                    data = JSON.parse(data);
                    console.log(data)
                    self.seedList = []
                    for(const item of data.res){
                        self.seedList.push({
                            id:item.id,
                            productid:item.productid,
                            title:item.title,
                            img:"http://210.28.188.103:8080/IntelligentAgriculture/res/"+item.image,
                            content:item.description,
                            company:item.company,
                            contact:item.contact,
                            tel:item.telphone,
                            location:item.productplace,
                            subKind:item.subkind
                        })
                    }
                })
            },
            getSeedDetail(item){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/seedDetail",{productid:item.id},function(data){
                    data = JSON.parse(data);
                    // self.drugDetail.name = data.res.name;
                    // self.drugDetail.drugType = data.res.type;
                    // self.drugDetail.company = data.res.company;
                    // self.drugDetail.tel = data.res.telphone;
                    // self.drugDetail.contact = data.res.contact;
                    // self.drugDetail.content = data.res.manualinstruct;
                    // self.drugDetail.img = "http://210.28.188.103:8080/IntelligentAgriculture/res/"+data.res.image
                    // self.showDrugDetail = true;
                })
            },
            //获取综合知识
            getCommon(req){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/commonList",req,function(data){
                    data = JSON.parse(data);
                    // console.log(data)
                    // self.feedList = []
                    // for(const item of data.res){
                    //     self.feedList.push({
                    //         id:item.id,
                    //         label:item.name,
                    //         img:"http://210.28.188.103:8080/IntelligentAgriculture/res/"+item.image,
                    //         content:item.manualinstruct
                    //     })
                    // }
                })
            },
            getCommonDetail(item){
                const self = this;
                self.$.get("/IntelligentAgriculture/product/seedDetail",{productid:item.id},function(data){
                    data = JSON.parse(data);
                    // self.drugDetail.name = data.res.name;
                    // self.drugDetail.drugType = data.res.type;
                    // self.drugDetail.company = data.res.company;
                    // self.drugDetail.tel = data.res.telphone;
                    // self.drugDetail.contact = data.res.contact;
                    // self.drugDetail.content = data.res.manualinstruct;
                    // self.drugDetail.img = "http://210.28.188.103:8080/IntelligentAgriculture/res/"+data.res.image
                    // self.showDrugDetail = true;
                })
            },

            selectMenu(index){
                const self = this;
                self.activeItem = index;
                //if actice

            }
        },
        mounted(){
            const self = this;
            
            self.getProduct({kind:"水产",subKind:"蟹类",page:1})
            self.getProduct({kind:"水产",subKind:"虾类",page:1})
            self.getProduct({kind:"水产",subKind:"鱼类",page:1})

            self.getFeed({page:1});
            self.getDrug({page:1});
            self.getSeed({page:1});
            self.getCommon({kind:"加工技术",page:1})
            self.getCommon({kind:"贮藏技术",page:1})
            self.getCommon({kind:"养殖设备",page:1})
            self.getCommon({kind:"营养健康",page:1})
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
        cursor:pointer;
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
    

    .Detail .info{
        display:flex;
        margin-top:20px;
    }
    .Detail .info .left{
        margin-right:20px;
        width:120px;
        height:180px;
        background-color:#4c92e4;
    }
    .Detail .info .left .img{
        width:100%;
        height:100%;
    }
    .Detail .info .right .info_item{
        margin-top:20px;
    }
    .Detail .info .right .info_item .label{
        font-weight:600;
        font-size:18px;
    }
    .Detail  .introduc{
         margin-top:20px;
    }
    .Detail  .introduc p{
        padding:10px;
        text-indent:2em;
    }
    .pro_card h3{
        text-align:center;
    }
    .pro_card .card_body{
        display:flex;
    }


    .seed_item{
        display:flex;
        margin-top:20px;    
        min-height:120px;
    }
    .seed_item .left  img{
        width:120px;
        height:180px;
        margin-right:10px;
        border:1px solid #c7c7c7;
    }
    .seed_item .center{
        flex:1;
        margin-right:10px;
    }
    .seed_item .right{
        width:200px;
    }
</style>