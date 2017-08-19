<template>
  <el-row class="content">
    <el-col :sm="{span: 6,offset: 3}">
      <div class="areaSelect">
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="areaChange">
        </el-cascader>
      </div>
      <ul id="poundlist">
				<li v-for="(ponud, index) in ponuds" @click="poundSelect(ponud)">{{ ponud.name }}</li>
			</ul>
    </el-col>
    <el-col :sm="{span: 12}">
      <el-row>
        <el-form :inline="true" :model="chartForm">
          <el-form-item>
            <el-button type="primary" @click="chartForm.byDataTime = !chartForm.byDataTime">{{ chartForm.byDataTime ? "按时区" : "按时段" }}</el-button>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-select v-model="chartForm.dateRange" @change="dateTimeRange" placeholder="时间范围">
              <el-option label="近一天" :value="60 * 60 * 24"></el-option>
              <el-option label="近三天" :value="60 * 60 * 24 * 3"></el-option>
              <el-option label="近一周" :value="60 * 60 * 24 * 7"></el-option>
              <el-option label="近一月" :value="60 * 60 * 24 * 30"></el-option>
              <el-option label="近三月" :value="60 * 60 * 24 * 90"></el-option>
              <el-option label="近半年" :value="60 * 60 * 24 * 180"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="chartForm.startTime" type="datetime" placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="chartForm.endTime" type="datetime" placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询数据</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <IEcharts  class="echarts" :option="bar" :loading="loading"></IEcharts>
      <button @click="doRandom">Random</button>
    </el-col>
  </el-row >
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3';
  let area = require("../assets/areaOptions.js");
  export default {
    components: {
      IEcharts
    },
    data: () => ({
      options: [],
      selectedOptions: [],
      pounds: [],
      loading: false,
      poundsForm: {
        areacode: '',
        facid: '',
        comid: ''
      },
      showpoundUrl:'/interface/dataDisplay/showpound',
      ponuds: [
        {fid:1,cid:2,sid:'0102',order: '',name: '固城湖塘口1'},
        {fid:1,cid:2,sid:'0304',order: '',name: '固城湖塘口2'},
        {fid:2,cid:2,sid:'0102',order: '',name: '渔网大市场3'},
        {fid:3,cid:2,sid:'0102',order: '',name: '渔网大市场4'},
        {fid:4,cid:2,sid:'0102',order: '',name: '渔网大市场5'},
        {fid:5,cid:2,sid:'0910',order: '',name: '固城湖威森'},
        {fid:6,cid:2,sid:'0409',order: '',name: '实验室'},
        {fid:7,cid:2,sid:'0',order: '43',name: '江宁基地'}
      ],
      ponud: {},
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
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }),
    created() {
      this.options = area.areaOptions;
      this.showpound();
      this.dateTimeRange(60 * 60 * 24);
    },
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      showpound(){
        const self = this;
        console.log(self.poundsForm);
        self.$.post(self.showpoundUrl,self.poundsForm,function(res){
          //TODO 塘口列表展示 pounds 赋值
          self.pound = self.pounds[0];
        })
        self.pound = self.pounds[0];
      },
      poundSelect(selectPonud){//塘口选择
        console.log(selectPonud);
        this.ponud = selectPonud;
      },
      queryCurrentData(){
        const self = this;
        let data = {
          factoryid: self.ponud.fid,
          comid: self.ponud.cid,
          senid: self.ponud.sid
        };
        self.$.post("/interface/dataDisplay/queryCurrentData",data,function(res){
          console.log(res);
        })
      },
      queryHistoryData(){
        const self = this;
        let data = {
          factoryid: self.ponud.fid,
          comid: self.ponud.cid,
          senid: self.ponud.sid,
          startTime: self.chartForm.startTime,
          endTime: self.chartForm.endTime
        };
        self.$.post("/interface/dataDisplay/queryHistoryData",self.poundsForm,function(res){
          console.log(res);
        })
      },
      areaChange(arrValue) {//地区选择
        const self = this;
        self.poundsForm.areacode = arrValue[2];
        self.showpound();
      },
      dateTimeRange(value){
        console.log(value);
        const self = this;
        let now = new Date()
        self.chartForm.endTime = now.format("yyyy-MM-dd HH:mm:ss");
        self.chartForm.startTime = new Date(now.getTime() - value).format("yyyy-MM-dd HH:mm:ss");
        console.log(self.chartForm);
        self.queryCurrentData();
        self.queryHistoryData();
      },
      onClick() {
      }
    }
  };
</script>

<style scoped>
  .echarts {
    width: 400px;
    height: 400px;
  }
</style>
