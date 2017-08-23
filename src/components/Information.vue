<template>
    <div class="information">
        <el-table
            :data="pondList"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="塘口名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="length"
                label="长"
                width="120">
            </el-table-column>
            <el-table-column
                prop="width"
                label="宽"
                width="120">
            </el-table-column>
            <el-table-column
                prop="deep"
                label="深"
                width="120">
            </el-table-column>
            <el-table-column
                prop="area"
                label="面积"
                width="180">
            </el-table-column>
            <el-table-column
                prop="location"
                label="地区">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                    size="small"
                    type="primary"
                    @click="editPond(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="deletePond(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-form ref="form_pond" :model="form_pond" :rules="pond_rule" label-width="80px">
            <el-form-item prop="name" label="塘口名">
                <el-input placeholder="请输入名字" v-model="form_pond.name"></el-input>
            </el-form-item>
            <el-form-item prop="length" label="长">
                <el-input placeholder="请输入数值" v-model="form_pond.length">
                    <template slot="append">米</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="width" label="宽">
                <el-input placeholder="请输入数值" v-model="form_pond.width">
                    <template slot="append">米</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="deep" label="深">
                <el-input placeholder="请输入数值" v-model="form_pond.deep">
                    <template slot="append">米</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="area" label="面积">
                <el-input placeholder="请输入数值" v-model="form_pond.area">
                    <template slot="append">亩</template>
                </el-input>
            </el-form-item>
            
            <!--地区-->
            <el-form-item prop="location" label="地区">
                <el-cascader
                    :options="area"
                    v-model="form_pond.location">
                </el-cascader>
            </el-form-item>

            <el-form-item prop="person" label="责任人">
                <el-input placeholder="请输入姓名" v-model="form_pond.person"></el-input>
            </el-form-item>
            <el-form-item prop="tel" label="联系方式">
                <el-input placeholder="请输入联系方式" v-model="form_pond.tel"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input placeholder="请输入邮箱" v-model="form_pond.email"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveNewPond('form_pond')">新增并保存塘口</el-button>
                <el-button type="primary" @click="saveEdit('form_pond')">保存修改</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    import area from "../assets/areaOptions"
    export default {
        data(){
            return{
                pondList:[],
                form_pond:{
                    id:"",
                    name:"",
                    length:"",
                    width:"",
                    deep:"",
                    area:"",
                    location:[],
                    person:"",
                    tel:"",
                    email:""
                },
                pond_rule:{
                    name:[
                        {type:"string",required: true, message: '请输入塘口名',trigger: 'change'}
                    ],
                    length:[
                        {required: true, message: '请输入长度',trigger: 'change'}
                    ],
                    width:[
                        {required: true, message: '请输入宽度',trigger: 'change'}
                    ],
                    deep:[
                        {required: true, message: '请输入深度',trigger: 'change'}
                    ],
                    area:[
                        {required: true, message: '请输入面积',trigger: 'change'}
                    ]
                },
                area:area.areaOptions,
                test:""
            }
        },
        methods:{
            //重置表单
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            //获取所有塘口
            getPonds(){
                const self = this;
                self.$.get("/IntelligentAgriculture/PondInfo/showPondinfos",function(res){
                    res = JSON.parse(res);
                    console.log(res)
                    self.pondList = [];
                    for(const item of res.pondinfo){
                        let location = "";
                        item.province = self.utils.transArea(item.province)
                        item.city = self.utils.transArea(item.city)
                        item.country = self.utils.transArea(item.country)
                        location = item.province.label + item.city.label + item.country.label
                        self.pondList.push({
                            id:item.id,
                            name:item.pondName,
                            length:item.pondLength,
                            width:item.pondWidth,
                            deep:item.pondDeep,
                            area:item.pondArea,
                            location:location,
                            person:item.personName,
                            tel:item.tel,
                            email:item.email
                        })
                    }
                })
            },
            //编辑塘口
            editPond(index, row) {
                console.log(index, row);
                const self = this;
                let data = {
                    id:row.id
                }
                self.$.post("/IntelligentAgriculture/PondInfo/showPondinfo",data,function(res){
                    self.resetForm('form_pond')
                    res = JSON.parse(res);
                    console.log(res)
                    let pondinfo = res.pondinfo;
                    pondinfo.province = self.utils.transArea(pondinfo.province)
                    pondinfo.city = self.utils.transArea(pondinfo.city)
                    pondinfo.country = self.utils.transArea(pondinfo.country)
                    self.form_pond.name = pondinfo.pondName;
                    self.form_pond.length = pondinfo.pondLength+'';
                    self.form_pond.width = pondinfo.pondWidth+'';
                    self.form_pond.deep = pondinfo.pondDeep+'';
                    self.form_pond.area = pondinfo.pondArea+'';
                    self.form_pond.location[0] = pondinfo.province.value;
                    self.form_pond.location[1] = pondinfo.city.value;
                    self.form_pond.location[2] = pondinfo.country.value;
                    self.form_pond.person = pondinfo.personName;
                    self.form_pond.tel = pondinfo.tel;
                    self.form_pond.email = pondinfo.email;
                    console.log(self.form_pond)
                })
            },
            //删除塘口
            deletePond(index, row) {
                console.log(index, row);
                const self = this;
                let data = {
                    id:row.id
                }
                self.$.post("/IntelligentAgriculture/PondInfo/deletePond",data,function(res){
                    self.getPonds();
                })
            },
            //保存新增塘口
            saveNewPond(formName){
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if(valid){
                        let local = this.utils.areaVtoVL(self.form_pond.location);
                        let data = {
                            // id:form_pond.id,
                            pondName:self.form_pond.name,
                            pondLength:self.form_pond.length,
                            pondWidth:self.form_pond.width,
                            pondDeep:self.form_pond.deep,
                            pondArea:self.form_pond.area,
                            prov:local[0],
                            city:local[1],
                            area:local[2],
                            pondLocation:"",
                            userName:self.form_pond.person,
                            tel:self.form_pond.tel,
                            email:self.form_pond.email
                        }
                        self.$.post("/IntelligentAgriculture/PondInfo/addPond",data,function(res){
                            self.getPonds();
                            self.resetForm(formName)
                        })
                    }else{
                        return false;
                    }
                })
                
            },
            //保存修改
            saveEdit(formName){
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if(valid){
                        let local = this.utils.areaVtoVL(self.form_pond.location);
                        let data = {
                            id:self.form_pond.id,
                            pondName:self.form_pond.name,
                            pondLength:self.form_pond.length,
                            pondWidth:self.form_pond.width,
                            pondDeep:self.form_pond.deep,
                            pondArea:self.form_pond.area,
                            prov:local[0],
                            city:local[1],
                            area:local[2],
                            pondLocation:"",
                            userName:self.form_pond.commander,
                            tel:self.form_pond.content,
                            email:self.form_pond.mail
                        }
                        self.$.post("/IntelligentAgriculture/PondInfo/updatePond",data,function(res){
                            self.getPonds();
                            self.resetForm(formName)
                        })
                    }else{
                        return false;
                    }
                })
            }
        },
        mounted(){
            this.getPonds()
        }
    }
</script>