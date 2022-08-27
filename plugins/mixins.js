
import moment from "moment"
import Vue from "vue"
import VCalendar from 'v-calendar';
Vue.use(VCalendar,{
  locale: 'th',
  locales: {
    'th': {
      masks: {
        L: "YYYY-MM-DD",
        title:"MMMM YYYY",
      }
    }
  }
});
Vue.mixin({
  data() {
    return {
    }
  },
  components:{
  },
  computed: {
  },
  methods: {
    moment
  }
})
