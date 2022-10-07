<script>
import Task from './task'
import NewTask from './new-task'
import TaskService from '@/domains/Tasks/services'
import { remove, size } from 'lodash'

export default {
  name: 'tasks',
  data: () => ({
    tasks: []
  }),
  components: {
    NewTask,
    Task
  },
  computed: {
    hasManyTasks () {
      return size(this.tasks) >= 3
    }
  },
  methods: {
    addTaskFirst (task) {
      this.tasks.unshift(task)
    },
    addTaskLast (task) {
      this.tasks.push(task)
    },
    getAll () {
      TaskService.getAll()
        .then(({ data }) => {
          this.tasks = data
        })
    },
    removeTask (task) {
      const { tasks } = this

      remove(tasks, task)

      this.tasks = [...tasks]
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>

<template>
  <div class="container-fluid">
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Tarefas Essenciais</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p>Todas suas tarefas da semana:</p>
            <NewTask v-on:new-task="addTaskFirst"></NewTask>
            <Task v-for="(task, index) in tasks" v-bind="{ task }" v-bind:key="index" v-on:delete="removeTask"></Task>
            <NewTask v-if="hasManyTasks" v-on:new-task="addTaskLast"></NewTask>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
