<template>
  <el-row class="content">
    <h1>经济效益</h1>
    <el-col :sm="{span: 9,offset: 3}">
      <el-row>
        <el-radio-group v-model="tangKous">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="租金">
          <el-form :inline="true" :model="tabForm1">
            <el-form-item prop="num1">
              <el-input v-model="tabForm1.num1" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item prop="unit1">
              <el-select v-model="tabForm1.unit1" placeholder="时间范围">
                <el-option label="年" :value="1"></el-option>
                <el-option label="月" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="num2">
              <el-input v-model="tabForm1.num2" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item prop="unit2">
              <el-select v-model="tabForm1.unit2" placeholder="时间范围">
                <el-option label="年" :value="1"></el-option>
                <el-option label="月" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">查询数据</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="种苗">
          <el-form :inline="true" :model="tabForm2">
            <el-form-item prop="num1" :label="蟹苗">
              <el-input v-model="tabForm2.num1" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item prop="unit1">
              <el-select v-model="tabForm2.unit1" placeholder="">
                <el-option label="斤" :value="1"></el-option>
                <el-option label="只" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="num2">
              <el-input v-model="tabForm2.num2" placeholder="单价"></el-input>
            </el-form-item>
            <el-form-item prop="unit2">
              <el-select v-model="tabForm2.unit2" placeholder="时间范围">
                <el-option label="元/斤" :value="1"></el-option>
                <el-option label="元/只" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="num1" :label="蟹苗">
              <el-input v-model="tabForm2.num1" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">查询数据</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="劳务成本">角色管理</el-tab-pane>
        <el-tab-pane label="日常投放">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :sm="{span: 9}">
      <el-row>

      </el-row>
    </el-col>
  </el-row >
</template>

<script>
    export default {
    data () {

      return {
        tangKous: [],
        tabForm1:{
          num1: '',
          unit1: '',
          num2: '',
          unit2: ''
        }
      }
    },
    created() {
      this.getTangKous();
    },
    methods:{
      getTangKous(){
        const self = this;
        self.$.post("/interface/PondInfo/showPondinfos",{time: new Date()},function(res){
          //TODO 塘口列表展示 tangKous 赋值
          console.log(res);
        })
      }
    }
  }
</script>
<style scoped>
  h1 {
      text-align: center;
  }
</style>
