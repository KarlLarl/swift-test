<template lang="pug">
div
  v-row
    v-col(
      cols="12",
      sm="4",
      md="2",
      v-for="(item, index) in listCard",
      :key="item.header + index"
    )
      v-card(tile height="100%")
        .header
          v-col
            v-icon(small, color="white") {{ item.icon }}
            span.ml-2.white--text {{ item.header }}
        v-card-text 
          v-col.text-center
            h1(:class="mapTextColor(item.header)") {{ item.detail }}
  v-row
    v-col(cols="12")
      v-card(tile)
        v-col.header
          .flex.align-self-center
            v-icon(small, color="white") far fa-list-alt
            span.ml-2.white--text Assignment of Open Work Order
          v-spacer
          div
            v-btn.white--text(color="orange") Start WO
        v-progress-linear(v-if="isLoading" indeterminate color="green")
        v-card-text 
          v-col
            v-chip.px-6.py-4.mr-1(:color="showType ==='list' ? 'success' : 'secondary'" @click="showType = 'list'")
              v-icon(left, small) fas fa-list
              span List
            v-chip.px-6.py-4.mx-1(:color="showType ==='calendar' ? 'success' : 'secondary'" @click="showType = 'calendar'")
              v-icon(left, small) fas fa-calendar
              span Calendar
            v-chip.px-6.py-4.mx-1(:color="showType ==='user' ? 'success' : 'secondary'")
              v-icon(left, small) fas fa-user
              span User
          v-col
            p 
              h3 {{ showType === 'list' ? 'List Table' : 'Calendar' }}
            TableList(v-if="showType === 'list'" :data="dataList")
            Calendar(v-if="showType === 'calendar'" :attributes="calculateCount")

</template>
<script>
import TableList from "./teble.vue"
import Calendar from "./calendar.vue"
export default {
  components: { TableList, Calendar},
  data() {
    return {
      listCard: [
        {
          header: "Upcoming Tasks",
          detail: "1",
          icon: "fas fa-exclamation-circle",
        },
        {
          header: "Late Tasks",
          detail: "5",
          icon: "far fa-clock",
        },
        {
          header: "Open Tasks",
          detail: "0",
          icon: "far fa-clock",
        },
        {
          header: "Completed Tasks",
          detail: "1",
          icon: "fas fa-check",
        },
        {
          header: "Overdue Tasks",
          detail: "2",
          icon: "far fa-clock",
        },
        {
          header: "Time Spent",
          detail: "24 hr",
          icon: "far fa-clock",
        },
      ],
      showType: 'list',
      dataList: [],
      calculateCount: [],
      isLoading: false
    };
  },
  mounted() {
    this.isLoading = true
    this.getDataList();
  },
  methods: {
    mapTextColor(type) {
      if (type === "Late Tasks") return "orange--text";
      if (type === "Overdue Tasks") return "error--text";
      if (type === "Time Spent") return "grey--text";
      else return "success--text";
    },
    getDataList() {
      this.$axios
        .get("https://swdapi.ddns.net:8090/data/ttntest")
        .then((res) => {
          this.dataList = res.data
          let obj = {}
          const a = this.dataList.map(i => this.moment(i.timestamp).format('YYYY-MM-DD'))
          const notSame = [...new Set(a)]
          obj = notSame.reduce((accumulator, value) => {
            return {...accumulator, [value]: ''};
          }, {});
          for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
              let element = obj[key];
              element = this.dataList.filter(i => this.moment(i.timestamp).format('YYYY-MM-DD') === key)
              // console.log('element', key, element.length);
              this.calculateCount.push({dates: this.moment(key)._d, customData: {date:this.moment(key), count:element.length}})
            }
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  background: #00c853;
}
</style>