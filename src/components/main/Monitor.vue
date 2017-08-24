<template>
  <el-row class="content">
      <div class="areaSelect">
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="areaChange">
        </el-cascader>
      </div>
      <el-tabs v-model="tabName" type="card">
        <el-tab-pane
          v-for="(tangKou, index) in tangKous"
          :key="index" :label="tangKou.name"
          :name="tangKou.name" @tab-click="tangKouSelect(index)">
        </el-tab-pane>
      </el-tabs>
      <div id="monitor-info">
        <el-row>
          <el-col :span="8">
            <div class="info">
              <el-col :span="7" :offset="4">
                <img class="fullWidth" src="../../../static/images/icon-t.png" />
              </el-col>
              <el-col :span="11":offset="1">
                <h2>{{currentData.temperature}}</h2>
                <span class="tip">实时水温</span>
              </el-col>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <el-col :span="7" :offset="4">
                <img class="fullWidth" src="../../../static/images/icon-o.png" />
              </el-col>
              <el-col :span="11":offset="1">
                <h2>{{currentData.oxygen}}</h2>
                <span class="tip">实时溶氧量</span>
              </el-col>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <el-col :span="7" :offset="4">
                <img class="fullWidth" src="../../../static/images/icon-p.png" />
              </el-col>
              <el-col :span="11":offset="1">
                <h2>{{currentData.ph}}</h2>
                <span class="tip">实时PH值</span>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-form :inline="true" :model="chartForm">
          <el-form-item>
            <el-button type="primary" @click="chartForm.byDataTime = !chartForm.byDataTime">{{ chartForm.byDataTime ? "按时区" : "按时段" }}</el-button>
          </el-form-item>
          <el-form-item label="时间范围" v-show="chartForm.byDataTime">
            <el-select v-model="chartForm.dateRange" @change="dateTimeRange" placeholder="时间范围">
              <el-option label="近一天" :value="60 * 60 * 24"></el-option>
              <el-option label="近三天" :value="60 * 60 * 24 * 3"></el-option>
              <el-option label="近一周" :value="60 * 60 * 24 * 7"></el-option>
              <el-option label="近一月" :value="60 * 60 * 24 * 30"></el-option>
              <el-option label="近三月" :value="60 * 60 * 24 * 90"></el-option>
              <el-option label="近半年" :value="60 * 60 * 24 * 180"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" v-show="chartForm.byDataTime">
            <el-date-picker v-model="chartForm.startTime" type="datetime" placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" v-show="chartForm.byDataTime">
            <el-date-picker v-model="chartForm.endTime" type="datetime" placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询数据</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <IEcharts  class="echarts" :option="bar"></IEcharts>
      <button @click="doRandom">Random</button>
  </el-row >
</template>

<script>
  import IEcharts from 'vue-echarts-v3';
  let area = require("../../assets/areaOptions.js");
  export default {
    components: {
      IEcharts
    },
    data: () => ({
      options: [],
      selectedOptions: [],
      tangKous: [],
      tabName: '',
      tangKousForm: {
        areacode: '',
        facid: '',
        comid: ''
      },
      showTangKouUrl:'/interface/dataDisplay/showTangKou',
      tangKous: [],
      tangKou: {},
      currentData: {
        temperature: 31.46,
        oxygen: 6.45,
        ph: 8.92
      },
      startTime: '',
      endTime: '',
      chartForm: {
        byDataTime: true,
        dateRange: 60 * 60 * 24,
        startTime: '',
        endTime: '',
      },
      bar: {
        title: {
          text: '水产传感数器采集数据'
        },
        tooltip: {},
        xAxis: {
          type: 'time',
          splitLine: {
              show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
              show: false
          }
        },
        series: [{
          name: 'Sales',
          type: 'line',
          data: []
        }]
      }
    }),
    created() {
      this.options = area.areaOptions;
      //this.tangKou = {fid:1,cid:2,sid:'0102',order: '',name: '固城湖塘口1'};
      this.tangKousForm.areacode = '0102';//TODO 登陆获取地区
      this.showTangKou();
      this.dateTimeRange(60 * 60 * 24);
    },
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.bar.series[0].data = data;
      },
      showTangKou(){
        const self = this;
        self.$.post(self.showTangKouUrl,self.tangKousForm,function(res){
          //TODO 塘口列表展示 tangKous 赋值
          self.tangKous = [
            {fid:1,cid:2,sid:'0102',order: '',name: '固城湖塘口1'},
            {fid:1,cid:2,sid:'0304',order: '',name: '固城湖塘口2'},
            {fid:2,cid:2,sid:'0102',order: '',name: '渔网大市场3'},
            {fid:3,cid:2,sid:'0102',order: '',name: '渔网大市场4'},
            {fid:4,cid:2,sid:'0102',order: '',name: '渔网大市场5'},
            {fid:5,cid:2,sid:'0910',order: '',name: '固城湖威森'},
            {fid:6,cid:2,sid:'0409',order: '',name: '实验室'},
            {fid:7,cid:2,sid:'0',order: '43',name: '江宁基地'}];
            self.tangKouSelect(0);
            self.tabName = self.tangKous[0].name;
        })
      },
      tangKouSelect(index){//塘口选择
        this.tangKou = this.tangKous[index];
      },
      queryCurrentData(){
        const self = this;
        let data = {
          factoryid: self.tangKou.fid,
          comid: self.tangKou.cid,
          senid: self.tangKou.sid
        };
        self.$.post("/interface/dataDisplay/queryCurrentData",data,function(res){
          console.log(res);
          self.currentData.temperature = Math.floor(Math.random() * (40 + 1 - 20) + 20);
          self.currentData.oxygen = Math.floor(Math.random() * (20 + 1 - 5) + 5);
          self.currentData.ph = Math.floor(Math.random() * (9 + 1 - 4) + 9);
        })
      },
      queryHistoryData(){
        const self = this;
        let data = {
          factoryid: self.tangKou.fid,
          comid: self.tangKou.cid,
          senid: self.tangKou.sid,
          startTime: self.chartForm.startTime,
          endTime: self.chartForm.endTime
        };
        self.$.post("/interface/dataDisplay/queryHistoryData",data,function(res){
          console.log(res);
          //self.bar.series[0].data = self.randomData(10);
        })
      },
      queryIntegration(){
        const self = this;
        let data = {
          factoryid: self.tangKou.fid,
          comid: self.tangKou.cid,
          senid: self.tangKou.sid,
          startTime: self.chartForm.startTime,
          endTime: self.chartForm.endTime
        };
        self.$.post("/interface/dataDisplay/queryIntegration",data,function(res){
          console.log(res);
          //self.bar.series[0].data = self.randomData(15);
        })
      },
      areaChange(arrValue) {//地区选择
        const self = this;
        self.tangKousForm.areacode = arrValue[2];
        self.showTangKou();
      },
      dateTimeRange(value){
        const self = this;
        let now = new Date();
        self.chartForm.endTime = now.format("yyyy-MM-dd hh:mm:ss");
        self.chartForm.startTime = new Date(now.getTime() - value*1000).format("yyyy-MM-dd hh:mm:ss");
        console.log(self.chartForm);
        self.randomData(value);
        self.queryCurrentData();
        if(value < 60 * 60 * 24 * 30) {
          self.queryHistoryData();
        } else {
          self.queryIntegration();
        }
      },
      randomData(loop) {
        // let data = [];
        // let startTime = new Date(this.chartForm.startTime).getTime();
        // let endTime = new Date(this.chartForm.endTime).getTime();
        // let step = (endTime - startTime)/loop;
        // for (var i = 0; i < loop; i++) {
        //   let tempDate = new Date(startTime + i * step);
        //   let temp = {
        //       name: tempDate.toLocaleString(),
        //       value: Math.floor(Math.random() * (9 + 1 - 4) + 9)
        //   }
        //   data.push(temp);
        // }
        // console.log(data);
        // return data;
      },
      onClick() {
      }
    }
  };
</script>

<style>
  .echarts {
    width: 100%;
    height: 400px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active, .el-tabs__header {
    border: none !important;
  }
  .areaSelect {
    margin: 20px;
  }
  #monitor-info {
    padding: 20px 50px;
  }
  #monitor-info .info {
    width: 300px;
    margin: 0 auto;
  }
  #monitor-info .info h2 {
    margin: 5px 0 20px 0;
    font-size: 28px;
  }
  #monitor-info .info .tip {
    font-size: 13px;
  }
</style>
