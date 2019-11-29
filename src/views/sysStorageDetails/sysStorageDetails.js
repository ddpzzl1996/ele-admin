import { getSysStorageDetails } from '@/api/newDataStatic'

export default {
  data() {
    return {
      topData: [],
      radio1: 1,
      detailImage: [], // 饼状图表数据
      weekOrMonthMoneyAndWeightList: [], // 金额重量列表
      weekOrMonthOrderList: [], // 订单量列表
      totalMoney: '', // 总额
      formData: {
        sysStorageId: '',
        timeType: 'week',
        imageType: 'week'
      }
    }
  },
  created() {
    this.topData = JSON.parse(sessionStorage.getItem('userInfo'))
    this.formData.sysStorageId = this.topData.id
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 柱状图切换
    radioChange() {
      this.drawLine(this.radio1)
    },
    drawLine(type) {
      // 订单量
      if (!type || type == 1) {
        // 单条数据统计
        this.chartData('订单量', this.weekOrMonthOrderList)
      }
      // 金额
      if (type == 2) {
        this.chartDataList(1, [{
          name: '订单金额（单位：元）',
          data: this.weekOrMonthMoneyAndWeightList
        }, {
          name: '入库金额（单位：元）',
          data: this.weekOrMonthMoneyAndWeightList
        }])
      }
      // 重量
      if (type == 3) {
        this.chartDataList(2, [{
          name: '订单重量（单位：元）',
          data: this.weekOrMonthMoneyAndWeightList
        }, {
          name: '入库重量（单位：元）',
          data: this.weekOrMonthMoneyAndWeightList
        }])
      }
      // 指定图表的配置项和数据

      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
    },
    // 饼状图
    drawCircular() {
      console.log(this.detailImage, '饼状图')
      this.selectDataPie(this.detailImage)
    },
    // 饼状图数据处理
    selectDataPie(data) {
      const myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      const option1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          // x: 'left',
          type: 'scroll',
          right: 100,
          top: 0,
          itemStyle: {
            normal: {
              fontSize: 10

            }
          }
        },
        color: ['#5ba0f8', '#6cc8c9', '#76c77c', '#f3d358', '#de6c7d', '#8d65dd'],
        series: [{
          name: '回收物品',
          type: 'pie',
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fff'
            }
          },
          content: ['60%', '90%'],
          radius: ['50%', '70%'],
          center: ['20%', '40%'], // 饼状图位置
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '10'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }]
      }
      console.log(data[0].data)
      this.totalMoney = data[0].totalMoney
      data[0].data.forEach((item, index) => {
        item.value = item.money
        item.name = `${item.title} | ${item.rate}   ${item.weight}t/￥${item.money}`
      })
      option1.series[0].data = data[0].data
      myChart1.clear()
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1)
    },
    // 单条数据处理
    chartData(name, data) {
      const option = {
        legend: {},
        tooltip: {},
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          axisLine: {
            show: false
          }
        },
        series: [

        ]
      }
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      const arr = data
      const arr1 = []
      const arr2 = [{
        type: 'bar',
        name: name,
        barGap: 0,
        itemStyle: {
          normal: {
            color: '#1890ff'
          }
        },
        data: []
      }]
      arr.forEach((item, index) => {
        arr1.push(item.startTime)
        arr2[0].data.push(Number(item.orderNum))
      })
      option.xAxis.data = arr1.reverse()
      if (arr2.length >= 2) {
        arr2.splice(1, 1)
      }
      arr2[0].data.reverse()
      option.series = arr2
      myChart.clear()
      myChart.setOption(option)
    },
    // 多条数据处理
    chartDataList(type, data) {
      const option = {
        legend: {},
        tooltip: {},
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          axisLine: {
            show: false
          }
        },
        series: [

        ]
      }
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      const arr = data
      console.log(data)
      const arr1 = []
      const arr2 = [{
        type: 'bar',
        name: data[0].name,
        barGap: 0,
        itemStyle: {
          normal: {
            color: '#1890ff'
          }
        },
        data: []
      }, {
        type: 'bar',
        name: data[1].name,
        barGap: 0,
        itemStyle: {
          normal: {
            color: '#f8cd76'
          }
        },
        data: []
      }]
      arr[0].data.forEach((item, index) => {
        arr1.push(item.startTime)
        if (type == 1) {
          arr2[0].data.push(Number(item.recyclemoney))
        } else {
          arr2[0].data.push(Number(item.recycleweight))
        }
      })
      arr[1].data.forEach((item, index) => {
        if (type == 1) {
          arr2[1].data.push(Number(item.storagemoney))
        } else {
          arr2[1].data.push(Number(item.storageweight))
        }
      })
      option.xAxis.data = arr1.reverse()
      arr2[0].data.reverse()
      arr2[1].data.reverse()
      option.series = arr2
      myChart.clear()
      myChart.setOption(option)
    },
    // 数据查询
    getList() {
      getSysStorageDetails(this.formData).then(res => {
        this.detailImage = res.data.detailImage
        this.weekOrMonthMoneyAndWeightList = res.data.weekOrMonthMoneyAndWeightList
        this.weekOrMonthOrderList = res.data.weekOrMonthOrderList
        this.drawLine(this.radio1)
        this.drawCircular()
      })
    }
  }
}
