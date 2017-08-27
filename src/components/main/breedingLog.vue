<template>
    <div class="breedingLog">
        
        <el-row class="actTheme" style="border-bottom:1px solid #9b9b9b;">
            <el-col :span="12" style="padding-top:20px;padding-bottom:60px;">
                <el-form ref="form_daily" :rules="daily_rule" :model="form_daily" label-width="90px">
                    <el-form-item>
                        <template slot="label"><span class="theme_title">日常投放</span></template>
                    </el-form-item>
                    <el-form-item prop="pond" label="塘口选择">
                        <el-select v-model="form_daily.pond"  placeholder="请选择塘口">
                            <el-option v-for="(pond,index) in formData.pondList" :label="pond.name" :value="pond.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="cate" label="投放类别">
                        <el-cascader
                            :options="formData.putCateList"
                            v-model="form_daily.cate">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item :prop="'goods.' + index + '.value'" v-for="(item,index) in form_daily.goods" :label="index == 0 ? '投放物品' :''" :key="index">
                        <el-input v-model="item.value" placeholder="投放物名称"></el-input>
                        <el-button v-if="index == form_daily.goods.length-1" type='primary' @click="addGoods">增加</el-button>
                        <el-button v-if="form_daily.goods.length != 1" type='danger' @click="delGoods(index)">删除</el-button>
                    </el-form-item>

                    <el-form-item prop="money" label="投放总额">
                        <el-input placeholder="总金额" v-model="form_daily.money">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="picList" label="上传图片">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="form_daily.picList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item  prop="date" label="活动时间">
                        <el-date-picker
                            v-model="form_daily.date"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="btn_group">
                        <el-button type="primary" @click="onDaily('form_daily')">提交</el-button>
                        <el-button type="danger" @click="resetForm('form_daily')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <span class="boundary"></span>
            <el-col :span="12" style="padding-left:40px;padding-top:20px;padding-bottom:60px;">
                <el-form ref="form_polling" :model="form_polling" :rules="polling_rule" label-width="80px">
                    <el-form-item>
                        <template slot="label"><span class="theme_title">巡视检查</span></template>
                    </el-form-item>
                    <el-form-item prop="pond" label="塘口选择">
                        <el-select v-model="form_polling.pond" placeholder="请选择塘口">
                            <el-option v-for="(pond,index) in formData.pondList" :label="pond.name" :value="pond.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="content" label="巡视内容">
                        <el-cascader
                            :options="formData.polling_content"
                            v-model="form_polling.content">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item prop="inputData" label="录入数据">
                        <el-radio-group v-model="form_polling.inputData">
                            <el-radio label="yes">是</el-radio>
                            <el-radio label="">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="form_polling.inputData === 'yes'">
                        <el-form-item prop="selectData" label="数据类型" style="display:inline-block">
                            <el-select v-model="form_polling.selectData" placeholder="请选择" @change="watchDataType">
                                <el-option
                                v-for="item in formData.dataType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="num" label="数值" style="margin-top:10px">
                            <el-input placeholder="请输入数值" v-model="form_polling.num" style="width:194px"></el-input>
                            <span>{{range}}</span>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item prop="picList" label="上传图片">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="form_polling.picList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="date" label="活动时间">
                        <el-date-picker
                            v-model="form_polling.date"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="btn_group">
                         <el-button type="primary" @click="onPolling('form_polling')">提交</el-button>
                        <el-button type="danger" @click="resetForm('form_polling')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        


        <el-row>
            <el-col :span="24">
                <div  class="myDaily">
                    <span>我的养殖日志</span>
                    <el-button size="small" type="warning" @click="exportDialogShow = true">导出日志</el-button>
                </div>
            </el-col>
        </el-row>

        <el-tabs v-model="kind"  @tab-click="swithKind">
            <el-tab-pane label="日常投放" name="throw" style="padding:20px">
                <el-table
                    :data="formData.tb_daily"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="投放物"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类别">
                    </el-table-column>
                    <el-table-column
                        prop="pond"
                        label="投放塘口">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="投放成本">
                    </el-table-column>
                    <el-table-column
                        label="图片">
                        <template scope="scope">
                            <el-button  type="primary" size="small" @click.native="checkImg(scope.$index, scope.row)">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="投放时间">
                </el-table-column>
                </el-table>
                <el-pagination
                    class="pagina"
                    :current-page.sync="daily.curPage"
                    :page-count="daily.totalPages"
                    layout="total, prev, pager, next"
                    :total="daily.totalRecode"
                    @current-change="curChange">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="巡视检查" name="patrol" style="padding:20px">
                <el-table
                    :data="formData.tb_polling"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="pond"
                        label="巡检塘口">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="巡检内容">
                    </el-table-column>
                    <el-table-column
                        prop="inputData"
                        label="录入的数据">
                    </el-table-column>
                    <el-table-column
                        label="图片">
                        <template scope="scope">
                            <el-button  type="primary" size="small" @click.native="checkImg(scope.$index, scope.row)">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="投放时间">
                </el-table-column>
                </el-table>
                <el-pagination
                    class="pagina"
                    :current-page.sync="polling.curPage"
                    :page-count="polling.totalPages"
                    layout="total, prev, pager, next"
                    :total="polling.totalRecode"
                    @current-change="curChange('polling')">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="导出日志" :visible.sync="exportDialogShow">
            <el-form ref="form_export" :model="form_export" label-width="120px">
                <el-form-item prop="startTime" label="起始时间">
                    <el-date-picker
                        v-model="form_export.startTime"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime" label="结束时间">
                    <el-date-picker
                        v-model="form_export.endTime"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item prop="exportType" label="导出内容">
                    <el-select v-model="form_export.exportType" placeholder="请选择导出内容">
                        <el-option v-for="(item,index) in formData.exportType" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="exportDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="exportTable('form_export')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import FileSaver from "file-saver"
    export default {
        data() {
            return {
                form_daily: {
                    pond:"",
                    cate:[],
                    goods:[
                        {name:"",value:""}
                    ],
                    money:"",
                    picList:[],
                    date:new Date()
                },
                daily_rule:{
                    pond:[
                        {type:"number",required: true, message: '请选择塘口',trigger: 'change'}
                    ],
                    cate:[
                        {type:"array",required: true, message: '请选择投放物类别',trigger: 'change'}
                    ]
                },
                form_polling:{
                    pond:"",
                    content:[],
                    inputData:"",
                    selectData:'',
                    num:"",
                    picList:[],
                    date:new Date()
                },
                polling_rule:{
                    pond:[
                        {type:"number",required: true, message: '请选择塘口',trigger: 'change'}
                    ],
                    content:[
                        {type:"array",required: true, message: '请选择巡视内容',trigger: 'change'}
                    ],
                    selectData:[
                        {type:"number",required: true, message: '请选择数据类型',trigger: 'change'}
                    ]
                },
                form_export:{
                    startTime:"2017/7/1",
                    endTime:new Date(),
                    exportType:"全部",
                },
                formData:{
                    pondList:[],
                    putCateList:[],
                    polling_content:[{
                        label:"水质",
                        value:"shuizhi",
                        children:[{
                            label:"水色",
                            value:"shuise",
                            children:[{
                                label:"正常",
                                value:"zhengchang"
                            },{
                                label:"发黑",
                                value:"fahei"
                            },{
                                label:"发绿",
                                value:"falv"
                            }]
                        },{
                            label:"水肥度",
                            value:"shuifeidu",
                            children:[{
                                label:"过高",
                                value:"guogao"
                            },{
                                label:"偏高",
                                value:"piangao"
                            },{
                                label:"正常",
                                value:"zhengchan"
                            },{
                                label:"偏低",
                                value:"piandi"
                            },{
                                label:"过低",
                                value:"guodi"
                            }]
                        },{
                            label:"水透明度",
                            value:"shuitoumingdu",
                            children:[{
                                label:"过高",
                                value:"guogao"
                            },{
                                label:"偏高",
                                value:"piangao"
                            },{
                                label:"正常",
                                value:"zhengchan"
                            },{
                                label:"偏低",
                                value:"piandi"
                            },{
                                label:"过低",
                                value:"guodi"
                            }]
                        },{
                            label:"水温",
                            value:"shuiwen",
                            children:[{
                                label:"过高",
                                value:"guogao"
                            },{
                                label:"偏高",
                                value:"piangao"
                            },{
                                label:"正常",
                                value:"zhengchan"
                            },{
                                label:"偏低",
                                value:"piandi"
                            },{
                                label:"过低",
                                value:"guodi"
                            }]
                        },{
                            label:"溶解氧",
                            value:"rongjieyang",
                            children:[{
                                label:"过高",
                                value:"guogao"
                            },{
                                label:"偏高",
                                value:"piangao"
                            },{
                                label:"正常",
                                value:"zhengchan"
                            },{
                                label:"偏低",
                                value:"piandi"
                            },{
                                label:"过低",
                                value:"guodi"
                            }]
                        }
                        ]},{
                            label:"螃蟹",
                            value:"pangxie",
                            children:[{
                                label:"吃料",
                                value:"chiliao",
                                children:[{
                                    label:"太少",
                                    value:"taishao"
                                },{
                                    label:"偏少",
                                    value:"pianshao"
                                },{
                                    label:"正常",
                                    value:"zhengchan"
                                },{
                                    label:"偏多",
                                    value:"pianduo"
                                },{
                                    label:"太多",
                                    value:"taiduo"
                                }]
                            },{
                                label:"活动力",
                                value:"huodongli",
                                children:[{
                                    label:"很弱",
                                    value:"henruo"
                                },{
                                    label:"偏弱",
                                    value:"pianruo"
                                },{
                                    label:"正常",
                                    value:"zhengchan"
                                },{
                                    label:"偏强",
                                    value:"pianqiang"
                                },{
                                    label:"很强",
                                    value:"henqiang"
                                }]
                            },{
                                label:"行为",
                                value:"xingwei"
                            },{
                                label:"体征",
                                value:"tizheng"
                            },{
                                label:"脱壳",
                                value:"tuoqiao"
                            }]
                        }
                    ],
                    dataType:[],
                    tb_daily:[],
                    // tb_daily:this.utils.arrRepeat([{
                    //     id:"0",
                    //     name:"测试五",
                    //     type:"螺蛳",
                    //     pond:"固城湖",
                    //     money:"100元",
                    //     pic:["asdasd"],
                    //     date:"2018-08-19 08:00"
                    // }]),
                    tb_polling:[],
                    // tb_polling:this.utils.arrRepeat([{
                    //     id:"0",
                    //     pond:"固城湖",
                    //     content:"水质水肥度: 偏低",
                    //     inputData:"含氧量2.3ml/L",
                    //     pic:["asdasd"],
                    //     date:"2018-08-19 08:00"
                    // }]),
                    exportType:[
                        {label:"全部",value:"全部"},
                        {label:"日常投放",value:"日常投放"},
                        {label:"巡视检查",value:"巡视检查"},
                    ]
                },
                addTheme:"0",
                myTheme:"0",
                daily:{
                    curPage:1,
                    totalRecode:0,
                    totalPages:1
                },
                polling:{
                    curPage:1,
                    totalRecode:0,
                    totalPages:1
                },
                kind:"throw",
                exportDialogShow:false,
                range:""
            }
        },
        methods: {
            /* 方法 */ 
           watchDataType(val){
                const self = this;
                for(const item of self.formData.dataType){
                    if(val==item.value){
                        self.range =  "(正常值 "+item.range+")"
                    }
                }
            },
            /* 页面方法 */
            //新增物品
            addGoods(){
                const self = this;
                self.form_daily.goods.push(
                     {name:"",value:""}
                )
            },
            //删除物品
            delGoods(index){
                const self = this;
                self.form_daily.goods.splice(index, 1);
            },
            
            //获取当前用户塘口信息
            getPonds(){
                const self = this;
                self.$.get("/IntelligentAgriculture/PondInfo/showPondinfos",function(data){
                    data = JSON.parse(data);
                    console.log(data)
                    if(data.resCode == 1){
                        self.formData.pondList = [];
                        for(const item of data.res){
                            self.formData.pondList.push({
                                name:item.pondName,
                                value:item.id
                            })
                        }
                    }else if(data.resCode == 0){
                        self.$message.error('获取塘口信息失败');
                    }
                })
            },
            //获取输入标签
            getDailyInputType(){
                const self = this;
                self.$.get("/IntelligentAgriculture/breedingLog/dailyInputType",function(data){
                    data = JSON.parse(data);
                    if(data.resCode == 1){
                        self.formData.putCateList = [];
                        for(const item of data.res){
                            self.formData.putCateList.push({
                                label:item.inputtypename,
                                value:item.inputtype
                            })
                        }
                    }else if(data.resCode == 0){
                        self.$message.error("获取类别信息失败")
                    }
                    
                })
            },
            //获取巡检类别
            getPollingType(){
                const self = this;
                self.$.get("/IntelligentAgriculture/breedingLog/showPatrolType",function(data){
                    data = JSON.parse(data);
                    if(data.resCode == 1){
                        self.formData.polling_content = [];
                        for(const item of data.res){
                            self.formData.polling_content.push({
                                label:item.name,
                                value:item.patroltype
                            })
                        }
                    }else if(data.resCode == 0){
                        self.$message.error("获取巡检类别失败")
                    }
                    
                })
            },
            //获取录入数据的类型
            getInputDataType(){
                const self = this;
                self.$.get("/IntelligentAgriculture/breedingLog/showManualData",function(data){
                    data = JSON.parse(data);
                    if(data.resCode == 1){
                        self.formData.dataType = [];
                        for(const item of data.res){
                            self.formData.dataType.push({
                                label:item.name,
                                value:item.datatype,
                                range:item.range
                            })
                        }
                    }else if(data.resCode == 0){
                        self.$message.error("获取数据类型失败")
                    }
                })
            },
            //提交日志
            onDaily(formName){
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        let throw_name = [];
                        self.form_daily.goods.forEach((item)=>{return item.value && throw_name.push(item.value)});
                        throw_name = throw_name.join(",")
                        let data = {
                            throw_pondId: self.form_daily.pond,
                            //水域唯一标识
                            throw_dailyinputtype:self.form_daily.cate[0],
                            //投放物类别
                            throw_sub_dailyinputtype:self.form_daily.cate[1] || "" ,
                            //投放物子类别
                            throw_name_edit:throw_name,
                            // //投放物名称
                            throw_price_all:self.form_daily.money,
                            //价格
                            throw_image:self.form_daily.picList,
                            // //图片对象集合
                            throw_activetime:self.form_daily.date.toLocaleDateString()
                            // //活动时间
                        };
                        self.$.post("/IntelligentAgriculture/breedingLog/throw",data,function(res){
                            console.log(res)
                        })
                    } else {
                        return false;
                    }
                });
            },
            //提交巡检
            onPolling(formName){
                const self = this;
                self.$refs[formName].validate((valid) => {
                   if(valid){
                       let data = {
                           pondId:self.form_polling.pond,
                           //水域唯一标识
                           patrolTarget:self.form_polling.content[0],
                           //巡视检查对象
                           patrolContentType1:self.form_polling.content[1] || "",
                           //当对象是水质时，对应的类别;
                           patrolContentType2: self.form_polling.content[2] || "",
                           //当对象是螃蟹/虾/鱼时，对应的类别
                           patrolContentStatus: self.form_polling.content[3] || "",
                           //状态内容，例如偏低、正常、偏高
                           patrolTargetPart:self.form_polling.content[4] || "",
                           //当选择“体征”时，弹出的部位选择框，因此对应的是螃蟹/虾/鱼的部位
                           //录入数据：
                           islog: self.form_polling.inputData == 'yes' ? 'yes':'no', //对应是否录入数据的元素标签值，取值为yes或no
                           catalog:self.form_polling.selectData,
                           //录入的数据类型
                           Ranges:self.form_polling.num,
                           //录入的数据范围
                           files:self.form_polling.picList,
                           //图片对象集合
                           activeTime:self.form_polling.date.toLocaleDateString(),
                           //活动时间
                       };
                       self.$.post("/IntelligentAgriculture/breedingLog/patrol",data,function(res){
                           console.log(res)
                       })
                   }else{
                       return false;
                   }
                })
            },
            //重置参数
            resetForm(formName){
                this.$refs[formName].resetFields();
            },

            //获取表格数据
            swithKind(tab){
                const self = this;
                self.kind = tab.name ;
                self.getTableDate();
            },
            getTableDate(){
                const self = this;
                let data = {
                    page: self.kind == 'throw' ? self.daily.curPage : self.polling.curPage,
                    kind: self.kind
                }
                
                self.$.get("/IntelligentAgriculture/breedingLog/showMyLog",data,function(data){
                    data = JSON.parse(data);
                    console.log(data)
                    if(data.resCode == 1){
                        if(self.kind == "throw"){
                            self.daily.totalRecode = data.res.totalSizeRecord;
                            self.daily.totalPages = data.res.totalPages;
                            self.daily.curPage = data.res.currentPage*1;
                            self.formData.tb_daily = [];
                            var i = 1
                            for(const item of data.res.recordsByPage){
                                self.formData.tb_daily.push({
                                    id:i++,
                                    name:item.Name,
                                    type:item.InputTypeName,
                                    pond:item.Pond_Name,
                                    money:item.Value,
                                    pic:item.ImageUrl,
                                    date:item.ActiveTime
                                })
                            }
                        }else{
                            self.polling.totalRecode = data.res.totalSizeRecord;
                            self.polling.totalPages = data.res.totalPages;
                            self.polling.curPage = data.res.currentPage*1;
                            self.formData.tb_polling = [];
                            var i = 1
                            for(const item of data.res.recordsByPage){
                                self.formData.tb_polling.push({
                                    id:i++,
                                    pond:item.Pond_Name,
                                    content:item.ContentType,
                                    inputData:item.Name+item.Value || "",
                                    pic:item.ImageUrl,
                                    date:item.ActiveTime
                                })
                            }
                        }
                    }else if(data.resCode == 0){
                        self.$message.error("获取日志失败")
                    }
                })
            },
            curChange(val){
                const self = this;
                self.getTableDate()
            },
            //表格中查看图片
            checkImg(index,row){
                const self = this;
                // let pic = row.pic.replace(/\[|\]/g,""); 
                let data = {
                    names : row.pic
                }
                self.$.post("/IntelligentAgriculture/breedingLog/loadImages",data,function(data){
                    data = JSON.parse(data);
                    if(data.resCode == 1){
                        if(data.res.length == 0){
                            self.$message.info("暂无图片")
                        }else{
                            window.location = data.res[0]
                        }
                    }else if(data.resCode == 0){
                        self.$message.error("获取图片失败")
                    }
                })
            },
         
            //导出表格内容
            exportTable(formName){
                const self = this;
                var start = new Date(self.form_export.startTime);
                var end = new Date(self.form_export.endTime);
                if(start.getTime()>end.getTime()){
                    self.$message.error("结束时间不能早于开始时间")
                }else{
                    var form = self.$('<form id="excel"></form>');
                    self.$('body').append(form);
                    var input1 = self.$("<input type='text' name='startTime'></input>");
                    var input2 = self.$("<input type='text' name='endTime'></input>");
                    var input3 = self.$("<input type='text' name='content_select'></input>");
                    input1.attr('value',start.toLocaleDateString())
                    input2.attr('value',end.toLocaleDateString())
                    input3.attr('value',self.form_export.exportType)
                    form.append(input1,input2,input3)
                    form.attr('action',"IntelligentAgriculture/breedingLog/export");
                    form.attr("method","POST");
                    form.attr('enctype',"multipart/form-data")
                    form.submit(); 
                    self.$("#excel").remove()
                    self.resetForm(formName);
                    self.exportDialogShow = false;
                }
            }
        },
        mounted(){
            var self = this;
            self.getPonds();
            self.getDailyInputType();
            self.getPollingType();
            self.getInputDataType();
            self.getTableDate()
        }
    }
</script>

<style scoped>
    .el-input{
        width:300px;
        margin-right:10px;
    }
    .actTheme{
        position:relative;
    }
    .btn_group{
        position:absolute;
        bottom:0;
    }
    .theme_title{
        width:90px !important;
        font-size:16px;
        font-weight:600;
        color:#333;
    }
    .boundary{
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:1px;
        height:100%;
        background-color:#9b9b9b;
    }
    .myDaily{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:20px 0px;
        font-size:16px;
        font-weight:600;
    }
    .pagina{
        text-align:center;
        padding-top:20px;
    }
</style>
