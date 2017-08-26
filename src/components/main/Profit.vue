<template>
  <el-row class="content">
    <h3>塘口选择</h3>
    <div>
      <el-row class="tabs menu_tabs">
        <div class="tab menu_tab"
            v-for="(tangkou,index) in tangKous"
            :class="{active: index == activeTangkou}"
            :key="index" @click="activeTangkou = index">
          <div :class="'wrapper wrapper' + index % 3">
            <span class="label" v-html="tangkou.pondName"></span>
          </div>
        </div>
      </el-row>
      <el-row class="tabs actions">
        <div :class="{action: true, tab: true, active: activeAction == index }" v-for="(ac, index) in actions" @click="triggerActions(index)">{{ ac }}</div>
      </el-row>
      <div v-if="activeAction == 0">
        <el-form :inline="true" :model="tabForm1" class="inlineForm">
          <el-col :span="3" class="label">养殖地租金</el-col>
          <el-form-item prop="num1">
            <el-input v-model="tabForm1.num1" placeholder="数量"></el-input>
          </el-form-item>
          <el-form-item prop="unit1">
            <el-select width="10px" v-model="tabForm1.unit1">
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div style="width: 30px;">&nbsp;</div>
          </el-form-item>
          <el-form-item prop="num2">
            <el-input v-model="tabForm1.num2" placeholder="数量"></el-input>
          </el-form-item>
          <el-form-item prop="unit2">
            <el-select v-model="tabForm1.unit2">
              <el-option label="元/月" value="元/月"></el-option>
              <el-option label="元/年" value="元/年"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">计算</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div v-if="activeAction == 1">
        <el-form :inline="true" :model="tabForm2" class="inlineForm">
          <el-row>
            <el-col :span="3" class="label">蟹苗</el-col>
            <el-form-item prop="num1" label="">
              <el-input v-model="tabForm2.num1" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item prop="unit1">
              <el-select v-model="tabForm2.unit1" placeholder="">
                <el-option label="斤" :value="1"></el-option>
                <el-option label="只" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div style="width: 30px;">&nbsp;</div>
            </el-form-item>
            <el-form-item prop="num2">
              <el-input v-model="tabForm2.num2" placeholder="单价"></el-input>
            </el-form-item>
            <el-form-item prop="unit2">
              <el-select v-model="tabForm2.unit2" placeholder="单位">
                <el-option label="元/斤" :value="1"></el-option>
                <el-option label="元/只" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">添加</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="3" class="label">套养</el-col>
            <el-form-item prop="num3" label="鱼">
              <el-input v-model="tabForm2.num3" placeholder="金额"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="width: 20px;">&nbsp;</div>
            </el-form-item>
            <el-form-item prop="num1" label="虾">
              <el-input v-model="tabForm2.num4" placeholder="金额"></el-input>
            </el-form-item>
          </el-row>
          <el-row style="text-align: center;margin: 20px 0;">
            <el-form-item>
              <el-button type="primary" @click="">计算</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div v-if="activeAction == 2">
        <el-form :inline="true" :model="tabForm3" class="inlineForm">
            <el-col :span="2" class="label">&nbsp;</el-col>
            <el-form-item prop="unit1">
              <el-select v-model="tabForm3.unit1">
                <el-option label="普通员工" value="普通员工"></el-option>
                <el-option label="临时工" value="临时工"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="num1">
              <el-input v-model="tabForm3.num1" placeholder="人数"></el-input>
            </el-form-item>
            <el-form-item prop="num2">
              <el-input v-model="tabForm3.num1" placeholder="年薪"></el-input>
            </el-form-item>
            <el-form-item prop="num2" label="元/年">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">添加</el-button>
            </el-form-item>
            <el-row style="text-align: center;margin: 20px 0;">
              <el-form-item>
                <el-button type="primary" @click="">计算</el-button>
              </el-form-item>
            </el-row>
        </el-form>
      </div>
      <div v-if="activeAction == 3">
        <el-form :inline="true" :model="tabForm4" class="inlineForm">
            <div>
              <el-col :span="2" class="label">水质调节</el-col>
              <el-form-item prop="num1" label="肥料">
                <el-input v-model="tabForm4.num1" placeholder="元"></el-input>
              </el-form-item>
              <el-form-item prop="num2" label="消毒解毒剂">
                <el-input v-model="tabForm4.num2" placeholder="元"></el-input>
              </el-form-item>
              <el-form-item prop="num3" label="菌类">
                <el-input v-model="tabForm4.num1" placeholder="元"></el-input>
              </el-form-item>
              <el-form-item prop="num4" label="底质改良剂">
                <el-input v-model="tabForm4.num2" placeholder="元"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-col :span="2" class="label">&</el-col>
              <el-form-item prop="num5" label="肥料">
                <el-input v-model="tabForm4.num5" placeholder="元"></el-input>
              </el-form-item>
              <el-form-item prop="num6" label="消毒解毒剂">
                <el-input v-model="tabForm4.num6" placeholder="元"></el-input>
              </el-form-item>
              <el-form-item prop="num7" label="菌类">
                <el-input v-model="tabForm4.num7" placeholder="元"></el-input>
              </el-form-item>
              <el-form-item prop="num8" label="底质改良剂">
                <el-input v-model="tabForm4.num8" placeholder="元"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="">添加</el-button>
            </el-form-item>
            <el-row style="text-align: center;margin: 20px 0;">
              <el-form-item>
                <el-button type="primary" @click="">计算</el-button>
              </el-form-item>
            </el-row>
        </el-form>
      </div>
    </div>

  </el-row>
</template>

<script>
    export default {
    data () {

      return {
        tangKous: [],
        actions: ['租金','种苗','劳务成本','日常投放','销售额'],
        activeTangkou: 0,
        activeAction: 0,
        tabForm1:{
          num1: '',
          unit1: '月',
          num2: '',
          unit2: '元/月'
        },
        tabForm2:{
          num1: '',
          unit1: '',
          num2: '',
          unit2: ''
        },
        tabForm3: {

        },
        tabForm4: {},
        tabForm5: {},
      }
    },
    created() {
      this.getTangKous();
    },
    methods:{
      triggerActions(index){
        const self = this;
        self.activeAction = index;
      },
      getTangKous(){
        const self = this;
        self.$.post("/IntelligentAgriculture/PondInfo/showPondinfos",{time: new Date()},function(res){
          let result = JSON.parse(res);
          if(result.res.length > 0) {
            self.tangKous = result.res;
          }
          //console.log(self.tangKous);
        })
      }
    }
  }
</script>
<style>
  .body.container {
    box-sizing: border-box;
    background-color: #f8f8f8;
  }
  .menu_tabs {
    background-color: #fff;
    padding: 15px;
  }
  .actions {
    padding: 14px;
  }
  .tabs{
      display:flex;
      justify-content:space-around;
      width:100%;
  }
  .tab {
      display:flex;
      flex-direction:column;
      text-align:center;
      cursor: pointer;
  }
  .action {
    width: 18.9%;
    display: inline-block;
    padding: 10px;
    background-color: #f8f8f8;
    cursor: pointer;
    text-align: center;
    border-radius: 5px;
  }
  .menu_tab:hover{
    color:#1cb4ad;
  }
  .action.active {
    background-color: #fff;
  }
  .menu_tab.active{
      color:#1cb4ad;
  }
  .menu_tab .label{
    font-size:18px;
  }
  .menu_tab .wrapper {
    margin: 0 auto;
    width: 115px;
    height: 115px;
    background-size: 100% 100%;
    line-height: 115px;
  }
  .menu_tab .wrapper0 {
    background-image: url('../../../static/images/cycle0.png');
  }
  .menu_tab .wrapper1 {
    background-image: url('../../../static/images/cycle1.png');
  }
  .menu_tab .wrapper2 {
    background-image: url('../../../static/images/cycle2.png');
  }
  .inlineForm {
    padding: 30px 5px;
  }
  .inlineForm .label {
    text-align: center;
    line-height: 38px;
  }
</style>
