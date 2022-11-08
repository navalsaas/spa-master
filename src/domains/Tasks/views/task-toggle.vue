<script>
import TaskService from '@/domains/Tasks/services'

export default {
  name: 'task-toggle',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggle () {
      TaskService.toggle(this.task)
        .then(() => {
          this.$emit('input', this.task)
        })
    }
  },
  watch: {
    'task.today_is_done' () {
      this.toggle()
    }
  }
}
</script>

<template>
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" :id="`task_${task.id}`" v-model="task.today_is_done">
    <label class="custom-control-label strikethrough" :for="`task_${task.id}`">
      {{ task.name }}
      <span class="badge badge-danger">{{task.area.name}}</span>
    </label>
  </div>
</template>
