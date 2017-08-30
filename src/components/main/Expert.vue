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
                                <img :src="'http://210.28.188.103:8080/IntelligentAgriculture/res/'+item.headImg">
                            </div>
                        </div>
                        <div class="right">
                            <div class="basic">
                                <span>姓名:{{item.personName}}</span>
                                <span>邮件:{{item.email}}</span>
                            </div>
                            <div class="info">
                                <span>单位:{{item.company}}</span>
                                <span>技术特长:{{item.enterpriseName}}</span>
                                <span>职位:{{item.professional}}</span>
                            </div>
                            <div class="introduc">
                                <span>简介:</span>
                                <p class="nowrap">{{item.description}}</p>
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
            <div class="know_group" style="padding:50px;">
                <el-row style="width: 48px;"><img src="../../../static/images/new.png" style="display: block; width: 100%;"/></el-row>
                <el-row style="margin-left: 20px;">
                    <el-col :span="20" class="group_item" v-for="(item,index) in newQuestions" :key="index">
                      <div style="line-height: 40px;">{{ index +"."+ item.title }}</div>
                    </el-col>
                </el-row>
            </div>
            <div class="know_group" style="padding:0 50px 50px;">
                <el-row style="width: 48px;"><img src="../../../static/images/hot.png" style="display: block; width: 100%;"/></el-row>
                <el-row style="margin-left: 20px;">
                    <el-col :span="20" class="group_item" v-for="(item,index) in hostQuestions" :key="index">
                      <div style="line-height: 40px;">{{ index +"."+ item.title }}</div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="activeItem == 2" >
            <div class="questionForm" >
              <el-form ref="questionForm" :model="questionForm" label-width="80px">
                <el-form-item label="活动名称">
                  <el-input v-model="questionForm.questionTitle"></el-input>
                </el-form-item>

                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="questionForm.contentType">
                    <el-checkbox label="饲料喂养"></el-checkbox>
                    <el-checkbox label="水质环境"></el-checkbox>
                    <el-checkbox label="病害防治"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="questionForm.content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="questionSubmit">提交</el-button>
                </el-form-item>
                </el-form>
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
                    {label:"专家列表",value:"",en:"Expert"},
                    {label:"问题集萃",value:"",en:"FAQ"},
                    {label:"我要提问",value:"",en:"Quiz"}
                ],
                newQuestions:[],
                hostQuestions:[],
                questionForm:{
                  userName:"",
                  questionTitle: "",
                  contentType: [],
                  content: ""
                },
                expertList:[],
                newQuestionPage: 1,
                hostQuestionPage: 1,
                expertPage: 1
            }
        },
        methods:{
            overString(val){
                return val.length > 70 ? val.substring(0,70)+"..." : val
            },
            //获取专家列表
            getExpertList(){
                const self = this;
                self.$.get("/IntelligentAgriculture/expert/expertList",{page: self.expertPage},function(res){
                  let result = JSON.parse(res);
                  if(result.resCode == 1) {
                    self.expertList = result.res;
                  } else {
                    self.$message.error(result.msg);
                  }
                })
            },
            //获取问题列表
            getQsList(){
                const self = this;
                self.$.post("/IntelligentAgriculture/expert/getNewQuestionsByPage",{page:self.newQuestionPage},function(res){
                  let result = JSON.parse(res);
                  if(result.resCode == 1) {
                    self.newQuestions = result.res.newQuestionByPage;
                    console.log(result.res);
                  } else {
                    self.$message.error(result.msg);
                  }
                })
            },
            //获取热门问题
            questionSubmit(){
              const self = this;
              self.questionForm.userName = localStorage.getItem('msuserName');
              self.$.post("/IntelligentAgriculture/expert/sharedQuestionSave",self.questionForm,function(res){
                let result = JSON.parse(res);
                if(result.resCode == 1) {
                  self.$message.success("提交成功");
                } else {
                  self.$message.error(result.msg);
                }
              })
            },
            getHotQsList(){
                const self = this;
                self.$.get("/IntelligentAgriculture/expert/getHostQuestionsByPage",{page:self.hostQuestionPage},function(res){
                  let result = JSON.parse(res);
                  if(result.resCode == 1) {
                    self.hostQuestions = result.res.hotQuestionByPage;
                    console.log(result.res);
                  } else {
                    self.$message.error(result.msg);
                  }
                })
            }
        },
        created(){
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
    .nowrap {
      overflow: hidden;
      text-overflow:ellipsis;
      height: 70px;
      font-size: 12px;
    }
    .questionForm {
      margin: 50px auto;
      width: 70%;
    }

</style>
