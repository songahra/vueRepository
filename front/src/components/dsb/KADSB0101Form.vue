<template>
    <div>
     <header class="card-header">
                <h2 class="card-title"><span class="i-rounded bg-danger"><i class="icon-home"></i></span>대시보드</h2>
            </header>
            <div id="base-info" class="tab-pane active">
                    <div class="row frm-row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="sub-bar">
                                    <i class="icon-plus text-dark"></i><p class="font-weight-bold">공지사항</p>
                                </div>
                                <div class="table-line"></div>
                                <div class="table-responsive">
                                    <table class="table">
                                     <colgroup>
                                         <col style="width: 5%">
                                         <col style="width: 75%">
                                         <col style="width: 20%">
                                     </colgroup>
                                         <tbody>
                                            <tr :key= "index" v-for= "(list, index ) in lists" >
                                                <td><i class="icon-three-dot"></i></td>
                                                <td>{{list.solution_code }}</td>
                                                <td>{{list.title }}</td>
                                             </tr>
                                         </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="sub-bar">
                                    <i class="icon-plus text-dark"></i><p class="font-weight-bold">솔루션 질의응답</p>
                                </div>
                                <div class="table-line"></div>
                                <div class="table-responsive">
                                    <table class="table">
                                     <colgroup>
                                         <col style="width: 5%">
                                         <col style="width: 75%">
                                         <col style="width: 20%">
                                     </colgroup>
                                        <thead>
                                            <tr>
                                                 <th>솔루션</th>
                                                 <th>질문</th>
                                                 <th>답변</th>
                                                 <th>평점(퍙균)</th>
                                                 <th>경과일(퍙균)</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                            <tr :key= "index" v-for= "(list, index ) in lists" >
                                                <td>{{list.rowNum }}</td>
                                                <td>{{list.solution_code }}</td>
                                                <td>{{list.title }}</td>
                                                <td>{{list.title }}</td>
                                                <td>{{list.title }}</td>
                                             </tr>
                                         </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row frm-row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <div class="sub-bar">
                                    <i class="icon-plus text-dark"></i><p class="font-weight-bold">통계</p>
                                </div>
                                <div class="table-line"></div>
                                <div class="table-responsive">
                                   <div id="chartdiv" style="height: 100%; width: 350px;">
                                      <bar-chart :chart-data="chartdata"></bar-chart>
                                   </div>
                                   <div id="chartdiv" style="height: 100%; width: 350px;">
                                      <bar-chart :chart-data="chartdata"></bar-chart>
                                   </div>
                                    <div id="chartdiv" style="height: 100%; width: 350px;">
                                      <bar-chart :chart-data="chartdata"></bar-chart>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import BarChart from '@/components/dsb/BarChart.js'
// import { main } from '@/api/dsh/main.js'

export default {
  extends: Bar,
  data: () => {
    return {
      title: '',
      status: '',
      sortType: '',
      tag_tag: '',
      tag_erc: '',
      tag_ert: '',
      solution_name: '',
      lists: '',
      chartdata: { labels: [], datasets: [], options: {} }
    }
  },
  components: {
    BarChart
  },
  props: [],
  created () {

  },
  mounted () {
    console.log('mounted!!')
    this.barchartdata()
  },
  methods: {
    // 차트데이터
    barchartdata () {
      this.chartdata = {
        labels: ['2015-01', '2015-02', '2015-03'],
        datasets: [
          {
            label: 'Bar Chart',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // 1번째 그래프 바탕색 빨강
              'rgba(54, 162, 235, 0.2)', // 2번째 그래프 바탕색 파랑
              'rgba(255, 206, 86, 0.2)', // 3번째 그래프 바탕색 노랑
              'rgba(75, 192, 192, 0.2)', // 4번째 그래프 바탕색 초록
              'rgba(153, 102, 255, 0.2)', // 5번째 그래프 바탕색 보라
              'rgba(255, 159, 64, 0.2)' // // 6번째 그래프 바탕색 주황
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            pointBorderColor: '#2554FF',
            data: [12, 2, 3]
          }
        ],
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'probability'
              },
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },
          legend: { display: true },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }

  }

}
</script>
