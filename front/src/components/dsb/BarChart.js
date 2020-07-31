import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar, // 그래프 형태 지정
  mixins: [reactiveProp] // 유동적 프롭스
}
