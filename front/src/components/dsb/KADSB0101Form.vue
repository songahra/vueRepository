<!-- 대시보드 From -->
<template>
  <div>
    <header class="card-header">
      <h2 class="card-title">
        <span class="i-rounded bg-danger"><i class="icon-home" /></span>대시보드
      </h2>
    </header>
    <div
      id="base-info"
      class="tab-pane active"
    >
      <div class="row frm-row">
        <div class="col-lg-6">
          <div class="form-group">
            <div class="sub-bar">
              <i
                class="icon-plus text-dark"
                @click="()=> {this.$router.push('/noticeList')}"
              /><p class="font-weight-bold">
                공지사항
              </p>
            </div>
            <div class="table-line" />
            <div class="table-responsive">
              <table class="table">
                <colgroup>
                  <col style="width: 5%">
                  <col style="width: 75%">
                  <col style="width: 20%">
                </colgroup>
                <tbody>
                  <tr
                    v-for="(ntlist, index ) in ntlists"
                    :key="index"
                    @click="clickNT(ntlist.notice_id)"
                  >
                    <td><i class="icon-three-dot" /></td>
                    <td>{{ ntlist.title }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <div class="sub-bar">
              <i
                class="icon-plus text-dark"
                @click="()=> {this.$router.push('/adm/solList')}"
              /><p class="font-weight-bold">
                솔루션 질의응답
              </p>
            </div>
            <div class="table-line" />
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
                  <tr
                    v-for="(list, index ) in lists.slice(0, 3)"
                    :key="index"
                  >
                    <td>{{ list.solution }}</td>
                    <td>{{ list.question }}</td>
                    <td>{{ list.answer }}</td>
                    <td>{{ list.avgScore }}</td>
                    <td>{{ list.dueDate }}</td>
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
              <i class="icon-plus text-dark" /><p class="font-weight-bold">
                통계
              </p>
            </div>
            <div class="table-line" />
            <div
              class="table-responsive"
              style="margin-left: 100px;"
            >
              <div style="width: 400px; height: 400px; float:left; padding:20px;">
                <canvas id="chart_qu" />
              </div>
              <div style="width: 400px; height: 400px; float:left; padding:20px;">
                <canvas id="chart_an" />
              </div>
              <div style="width: 400px; height: 400px; float:left; padding:20px;">
                <canvas id="chart_po" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Bar } from 'vue-chartjs'
import Chart from 'chart.js'
// import BarChart from '@/components/dsb/BarChart.js'
import { main, noticeList } from '@/api/dsb/DashBoard.js'

export default {
  components: {
    // BarChart
  },
  // extends: Bar,
  props: [],
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
      label: ''

    }
  },
  created () {
    console.log('created!!')
    this.noticeList()
  },
  mounted () {
    this.main()
  },
  methods: {
    noticeList () {
      noticeList()
        .then((res) => {
          if (res.status === 200) {
            console.log('noticeList res => ', res)
            this.ntlists = res.data
            console.log('noticeList res => ', this.ntlists)
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

            this.createChart('chart_qu')
            this.createChart('chart_an')
            this.createChart('chart_po')
          }
        })
    },
    createChart (chartId) {
      if (chartId === 'chart_qu') {
        this.label = '질문 수'
        var ctx = document.getElementById(chartId)
        var config = {
          type: 'bar',
          data: {
            labels: [this.sol1, this.sol2, this.sol3],
            datasets: [{
              label: this.label,
              data: [this.question1, this.question2, this.question3],
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
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                // stepSize: 5
                }
              }]
            }
          }
        }

        this.chart = new Chart(ctx, config) // eslint-disable-line no-unused-vars
      } else if (chartId === 'chart_an') {
        this.label = '답변 수'
        var ctxAn = document.getElementById(chartId)
        var configAn = {
          type: 'bar',
          data: {
            labels: [this.sol1, this.sol2, this.sol3],
            datasets: [{
              label: this.label,
              data: [this.answer1, this.answer2, this.answer3],
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
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                // stepSize: 5
                }
              }]
            }
          }
        }

        this.chart = new Chart(ctxAn, configAn) // eslint-disable-line no-unused-vars
      } else if (chartId === 'chart_po') {
        this.label = '누적 포인트'
        var ctxPo = document.getElementById(chartId)
        var configPo = {
          type: 'bar',
          data: {
            labels: [this.sol1, this.sol2, this.sol3],
            datasets: [{
              label: this.label,
              data: [this.point1, this.point2, this.point3],
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
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                // stepSize: 5
                }
              }]
            }
          }
        }

        this.chart = new Chart(ctxPo, configPo) // eslint-disable-line no-unused-vars
      }
    },
    clickNT (value) {
      console.log('value??', value)
      const param = {
        notice_id: value
      }
      this.$router.push({ name: 'noticeDetail', params: param })
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
