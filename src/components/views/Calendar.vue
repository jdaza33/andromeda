<template>
  <vue-event-calendar :events="demoEvents"></vue-event-calendar>
</template>

<script>
export default {
  data () {
    return {
      demoEvents: [{
        date: '2018/08/12', // Required
        title: 'Foo' // Required
      }, {
        date: '2016/12/15',
        title: 'Bar',
        desc: 'description',
        customClass: 'disabled highlight' // Custom classes to an calendar cell
      }]
    }
  }
}
</script>

<style scoped>
.__vev_calendar-wrapper .cal-wrapper {
    width: 50%;
    padding: 1px 5px;
}
@media screen and (min-width: 768px){
.__vev_calendar-wrapper .events-wrapper {
    width: 50%;
    background-color: #6200ff;
    color: #fff;
    padding: 40px 45px;
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
}
}
</style>
