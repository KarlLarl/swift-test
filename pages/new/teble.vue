<template lang="pug">
div
    v-data-table(
        :headers="headers",
        :items="data",
        :items-per-page="10"
    )
        template(v-slot:item.other="{ item }")
            v-btn( color="success").text-capitalize view
        template(v-slot:item.calories="{ item }")
            span {{ item.calories ? item.calories : '-' }} 
        template(v-slot:item.fat="{ item }")
            span {{ item.fat ? item.fat : '-' }} 
        template(v-slot:item.carbs="{ item }")
            span {{ item.carbs ? item.carbs : '-' }} 
        template(v-slot:item.dueDate="{ item }")
            span {{ item.dueDate ? item.dueDate : '-' }} 
        template(v-slot:item.spent="{ item }")
            span {{ item.spent ? item.spent : '-' }} 
        template(v-slot:item.status="{ item }")
            span {{ item.status ? item.status : '-' }} 
        template(v-slot:item.timestamp="{ item }")
            span {{ moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss') }}
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
    data() {
        return {
            headers: [
                {
                text: 'Work ID',
                align: 'start',
                sortable: false,
                value: 'id',
                },
                { text: 'Name', value: 'calories', sortable: false },
                { text: 'Asset', value: 'fat' , sortable: false},
                { text: 'Work Order', value: 'carbs', sortable: false },
                { text: 'Plant Date', value: 'timestamp', sortable: false },
                { text: 'Actual Start Date', value: 'timestamp', sortable: false },
                { text: 'Finish Date', value: 'timestamp' , sortable: false},
                { text: 'Due Date', value: 'dueDate', sortable: false},
                { text: 'Time Spent', value: 'spent', sortable: false },
                { text: 'Status', value: 'status', sortable: false},
                { text: 'View', value: 'other', align: 'center', sortable: false,},
            ],
        }
    },
}
</script>
<style lang="scss" scoped>

</style>