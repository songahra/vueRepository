<!-- 대시보드 From -->
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
                                            <tr :key= "index" v-for= "(ntlist, index ) in ntlists" >
                                                <td><i class="icon-three-dot"></i></td>
                                                <td>{{ntlist.title }}</td>
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
                                         <col style="width: 25%">
                                         <col style="width: 25%">
                                         <col style="width: 25%">
                                         <col style="width: 25%">
                                     </colgroup>
                                        <thead>
                                            <tr>
                                                 <th>솔루션</th>
                                                 <th>질문</th>
                                                 <th>답변</th>
                                                 <th>평점(평균)</th>
                                                 <th>경과일(평균)</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                            <tr :key= "index" v-for= "(list, index ) in lists.slice(0, 3)" >
                                                <td>{{list.solution }}</td>
                                                <td>{{list.question }}</td>
                                                <td>{{list.answer }}</td>
                                                <td>{{list.scoreCount }}</td>
                                                <td>{{list.dueDate }}</td>
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
                                <div class="table-responsive" style="
    margin-left: 100px;
" >
                                   <div id="chartdiv" style="float:left; padding:20px;">
                                      <bar-chart :chart-data="chartdata_qu"></bar-chart>
                                   </div>
                                   <div id="chartdiv" style="float:left; padding:30px;">
                                      <bar-chart :chart-data="chartdata_an"></bar-chart>
                                   </div>
                                   <div id="chartdiv" style="float:left; padding:20px;">
                                      <bar-chart :chart-data="chartdata_po"></bar-chart>
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
import { main, noticeList } from '@/api/dsb/DashBoard.js'

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

      data: '',
      lists: '',
      ntlists: '',
      solutions: '',

      // 차트 데이터
      sol1: '',
      sol2: '',
      sol3: '',
      question1: '',
      question2: '',
      question3: '',
      answer1: '',
      answer2: '',
      answer3: '',
      point1: '',
      point2: '',
      point3: '',
      chartdata_qu: {
        labels: [],
        datasets: [],
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      },
      chartdata_an: { labels: [], datasets: [], options: {} },
      chartdata_po: { labels: [], datasets: [], options: {} }

    }
  },
  components: {
    BarChart
  },
  props: [],
  created () {
    console.log('created!!')
    this.noticeList()
    this.main()
  },
  mounted () {
    console.log('mounted!!')

    // this.barchartdata()
  },
  methods: {
    noticeList () {
      noticeList()
        .then((res) => {
          if (res.status === 200) {
            console.log('noticeList res => ', res)
            this.ntlists = res.data
          }
        })
    },
    main () {
      main()
        .then((res) => {
          if (res.status === 200) {
            console.log('main res => ', res)
            this.data = res.data
            this.lists = this.data.slice(0, 3)
            console.log('this.solutions', this.lists)

            this.sol1 = this.lists[0].solution
            this.sol2 = this.lists[1].solution
            this.sol3 = this.lists[2].solution

            this.question1 = this.lists[0].question
            this.question2 = this.lists[1].question
            this.question3 = this.lists[2].question

            this.answer1 = this.lists[0].answer
            this.answer2 = this.lists[1].answer
            this.answer3 = this.lists[2].answer

            this.point1 = this.lists[0].point
            this.point2 = this.lists[1].point
            this.point3 = this.lists[2].point

            console.log('this.solutionsdd', this.sol1, this.sol2, this.sol3)

            // 차트 데이터
            this.barchartdata()
          }
        })
    },
    // 차트데이터
    barchartdata () {
      console.log('this.solutionsdddddddd', this.sol1, this.sol2, this.sol3)
      this.chartdata_qu = {
        labels: [this.sol1, this.sol2, this.sol3],
        datasets: [
          {
            label: '질문수',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // 1번째 그래프 바탕색 빨강
              'rgba(54, 162, 235, 0.2)', // 2번째 그래프 바탕색 파랑
              'rgba(255, 206, 86, 0.2)' // 3번째 그래프 바탕색 노랑
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            pointBorderColor: '#2554FF',
            data: [this.question1, this.question2, this.question3]
          }
        ],
        options: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 80,
              fontColor: 'black'
            }
          },
          responsive: true,
          title: {
            display: true,
            text: '막대 차트 테스트'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function (tooltipItems, data) {
                return data.labels[tooltipItems[0].datasetIndex]
              }
            }
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            yAxes: [{
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: '질문수'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                min: 0
              },
              gridLines: {
                display: true,
                offsetGridLines: true
              }
            }],
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true
                // stepSize: 5,
                // min: 0
              },
              gridLines: {
                display: false
              }
            }]

          },
          maintainAspectRatio: false

          // scaleBeginAtZero: true
        }
      }
      this.chartdata_an = {
        labels: [this.sol1, this.sol2, this.sol3],
        datasets: [
          {
            label: '답변 수',
            borderWidth: 1,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)', // 4번째 그래프 바탕색 초록
              'rgba(153, 102, 255, 0.2)', // 5번째 그래프 바탕색 보라
              'rgba(255, 159, 64, 0.2)' // // 6번째 그래프 바탕색 주황
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            pointBorderColor: '#2554FF',
            data: [this.answer1, this.answer2, this.answer3]
          }
        ],
        options: {
          responsive: true,
          title: {
            display: true,
            text: '막대 차트 테스트'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function (tooltipItems, data) {
                return data.labels[tooltipItems[0].datasetIndex]
              }
            }
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            yAxes: [{
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: '답변 수'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                min: 0
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                min: 0
              },
              gridLines: {
                display: false
              }
            }]

          },
          legend: { display: true },
          maintainAspectRatio: false

        }
      }
      this.chartdata_po = {
        labels: [this.sol1, this.sol2, this.sol3],
        datasets: [
          {
            label: '포인트 점수',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // 1번째 그래프 바탕색 빨강
              'rgba(54, 162, 235, 0.2)', // 2번째 그래프 바탕색 파랑
              'rgba(255, 206, 86, 0.2)' // 3번째 그래프 바탕색 노랑
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            pointBorderColor: '#2554FF',
            data: [this.point1, this.point2, this.point3]
          }
        ],
        options: {
          responsive: true,
          title: {
            display: true,
            text: '막대 그래프'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function (tooltipItems, data) {
                return data.labels[tooltipItems[0].datasetIndex]
              }
            }
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            yAxes: [{
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: '포인트 수'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                min: 0
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                min: 0
              },
              gridLines: {
                display: false
              }
            }]

          },
          legend: { display: true },
          maintainAspectRatio: false

        }
      }
    }

  }

}
</script>
<style >
#box-left {
  background: red;
  flex: 1;
}
#box-center {
  background: orange;
  flex: 3;
  text-align: center;
}
#box-right {
  background: yellow;
  flex: 1;
  text-align: right;
}
</style>
