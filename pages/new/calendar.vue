<template lang="pug">
div
  v-calendar.custom-calendar(
      :masks="masks",
      :attributes="attributes",
      disable-page-swipe,
      is-expanded,
      :min-date="new Date(moment().format('2020,7'))",
      :max-date="new Date(moment().format('2020,7'))"
  )
    template(v-slot:day-content="{ day, attributes }")
      .flex(style="height:100%")
        .flex.justify-space-between.flex-col(style="height:100%")
          div {{ day.day }}
          .flex(v-for="(item,index) in attributes" :key="index" style="position: absolute; bottom: 0;")
            span {{ item.customData.count }} ข้อมูล
</template>
<script>
export default {
  props: {
    attributes: {
      type: Array,
      default: []
    }
  },
  data() {
      return {
        masks: { weekdays: "WWW" },
      }
  },
  mounted() {
    console.log('attributes', this.attributes)
  },
  methods: {
    test(value){
      console.log('value', value)
    }
  }
}
</script>
<style lang="scss" scoped>

.custom-calendar.vc-container::v-deep {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
    overflow: auto;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>