<script>
import Areas from '@/domains/Areas/views/areas'
import TodaysTasks from '@/domains/Tasks/views/todays-tasks'

export default {
  name: 'Dashboard',
  components: {
    Areas,
    TodaysTasks
  }
}
</script>
<template>
  <div class="container-fluid">
    <Areas />
    <TodaysTasks></TodaysTasks>
  </div>
</template>
