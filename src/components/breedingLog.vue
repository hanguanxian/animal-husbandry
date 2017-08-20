<template>
    <div class="breedingLog">
        <el-form ref="swithType" label-width="80px">
            <el-form-item label="活动主题">
                <el-radio-group v-model="addTheme">
                    <el-radio label="0">日常投放</el-radio>
                    <el-radio label="1">巡视检查</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form  v-if="addTheme=='0'" ref="form_daily" :model="form_daily" label-width="80px">
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
            <el-form-item>
                <el-button type="primary" @click="onDaily">提交</el-button>
                <el-button type="danger" @click="resetForm('form_daily')">重置</el-button>
            </el-form-item>
        </el-form>


        <el-form v-if="addTheme=='1'" ref="form_polling" :model="form_polling" label-width="80px">
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
                    <el-select v-model="form_polling.selectData" placeholder="请选择">
                        <el-option
                        v-for="item in formData.dataType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="num" label="数值" style="display:inline-block">
                    <el-input placeholder="请输入数值" v-model="form_polling.num"></el-input>
                    <span>(正常值<0.3mg/L)</span>
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
            <el-form-item>
                <el-button type="primary" @click="onPolling">提交</el-button>
                <el-button type="danger" @click="resetForm('form_polling')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-tabs v-model="kind"  @tab-click="swithKind">
            <el-tab-pane label="日常投放" name="throw">
                <el-button type="warning" @click="exportDialogShow = true">导出日志</el-button>
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
                    :current-page.sync="daily.curPage"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="巡视检查" name="patrol">
                <el-button type="warning" @click="exportDialogShow = true">导出日志</el-button>
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
                    :current-page.sync="polling.curPage"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="导出日志" :visible.sync="exportDialogShow">
            <el-form :model="form_export" label-width="120px">
                <el-form-item prop="startTime" label="起始时间">
                    <el-date-picker
                        v-model="form_export.startTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime" label="结束时间">
                    <el-date-picker
                        v-model="form_export.endTime"
                        type="datetime"
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
                <el-button type="primary" @click="exportDialogShow('form_export')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
                    date:"",
                },
                form_polling:{
                    pond:"",
                    content:[],
                    inputData:"",
                    selectData:'',
                    num:"",
                    picList:[],
                    date:"",
                },
                form_export:{
                    startTime:"",
                    endTime:"",
                    exportType:"",
                },
                formData:{
                    pondList:[
                        {name:"固城湖",value:"guchenghu"},
                        {name:"阳澄湖",value:"yangchenghu"},
                        {name:"西湖",value:"xihu"}
                    ],
                    putCateList:[
                        {label:"饵料",value:"erliao"},
                        {label:"螺丝",value:"luosi"},
                        {label:"水草",value:"shuicao"},
                        {label:"水质调节剂",value:"SZtiaojie",children:[{
                            label:"肥料",value:"feiliao"},{
                            label:"菌类",value:"junlei"},{
                            label:"消毒剂",value:"xiaoduji"
                        }]},
                        {label:"其他",value:"other"}
                    ],
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
                    dataType:[
                        {label:"PH",value:"ph"},
                        {label:"溶氧量",value:"o2"},
                        {label:"水温",value:"shuiwen"}
                    ],
                    tb_daily:this.arrRepeat([{
                        id:"0",
                        name:"测试五",
                        type:"螺蛳",
                        pond:"固城湖",
                        money:"100元",
                        pic:["asdasd"],
                        date:"2018-08-19 08:00"
                    }]),
                    tb_polling:this.arrRepeat([{
                        id:"0",
                        pond:"固城湖",
                        content:"水质水肥度: 偏低",
                        inputData:"含氧量2.3ml/L",
                        pic:["asdasd"],
                        date:"2018-08-19 08:00"
                    }]),
                    exportType:[
                        {label:"全部",value:"all"},
                        {label:"日常投放",value:"throw"},
                        {label:"巡视检查",value:"patrol"},
                    ]
                },
                addTheme:"0",
                myTheme:"0",
                daily:{
                    curPage:1,
                },
                polling:{
                    curPage:1,
                },
                kind:"throw",
                exportDialogShow:false
            }
        },
        methods: {
            /* 方法 */ 
            arrRepeat(arr){
                if(Object.prototype.toString.call(arr)=='[object Array]' && arr.length>0){
                    for(let i = 0 ;i<10;i++){
                        arr.push(arr[0])
                    }
                    return arr;
                }else{
                  return ""  
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
                self.$.get("/IntelligentAgriculture/PondInfo/showPondinfos",function(res){
                    console.log(res)
                })
            },
            //获取输入标签
            getDailyInputType(){
                const self = this;
                self.$.get("/IntelligentAgriculture/breedingLog/dailyInputType",function(res){
                    console.log(res)
                })
            },
            //获取巡检类别
            getPollingType(){
                const self = this;
                self.$.get("/IntelligentAgriculture/breedingLog/showPatrolType",function(res){
                    console.log(res)
                })
            },
            //获取录入数据的类型
            getInputDataType(){
                const self = this;
                self.$.get("/IntelligentAgriculture/breedingLog/showManualData",function(res){
                    console.log(res)
                })
            },
            //提交日志
            onDaily(){
                const self = this;
                console.log(self.form_daily)
                let throw_name = [];
                self.form_daily.goods.forEach((item)=>{return item.value && arr.push(item.value)});
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
                     throw_image:self.form_daily.picList,
                    // //图片对象集合
                     throw_activetime:self.form_daily.date
                    // //活动时间
                };
                self.$.post("/breedingLog/throw",data,function(res){
                    console.log(res)
                })
            },
            //提交巡检
            onPolling(){
                const self = this;
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
                    activeTime:self.form_polling.date,
                    //活动时间
                };
                self.$.post("/breedingLog/patrol",data,function(res){
                    console.log(res)
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
                // self.getTableDate();
            },
            getTableDate(){
                const self = this;
                let data = {
                    page: self.kind == 'throw' ? self.daily.curPage : self.polling.curPage,
                    kind: self.kind
                }
                console.log(data)
                self.$.post("/IntelligentAgriculture/system/showMyLog",data,function(res){
                    console.log(res)
                })
            },
            //表格中查看图片
            checkImg(index,row){
                const self = this;
                let data = {
                    names : row.pic.join('')
                }
                self.$.post("IntelligentAgriculture/breedingLog/loadImages",data,function(res){
                    console.log(res)
                })
            },
         
            //导出表格内容
            exportTable(formName){
                const self = this;
                let data = {
                    startTime:self.form_export.startTime,
                    endTime:self.form_export.endTime,
                    content_select:self.form_export.exportType
                }
                self.$.post("IntelligentAgriculture/breedingLog/export",data,function(res){
                    console.log(res)
                    self.resetForm(formName)
                })
                
            }
            

        },
        created(){
            var self = this;
            // self.getPonds();
            // self.getDailyInputType();
            // self.getPollingType();
            // self.getInputDataType();
        }
    }
</script>

<style scoped>
     .el-input{
         width:300px;
         margin-right:10px;
     }
</style>
