<script>
import TaskService from '@/domains/Tasks/services'
import TaskToggle from './task-toggle'
import { countBy } from 'lodash'

export default {
  name: 'todays-tasks',
  components: {
    TaskToggle
  },
  computed: {
    todayIs () {
      const days = {
        monday: 'segunda-feira',
        tuesday: 'terça-feira',
        wednesday: 'quarta-feira',
        thursday: 'quinta-feira',
        friday: 'sexta-feira',
        saturday: 'sábado',
        sunday: 'domingo'
      }

      const today = days[this.today] || ''

      if (!today) {
        return ''
      }

      return `Hoje é ${today}`
    },
    messageRemaining () {
      const { remaining } = this

      if (remaining === 1) {
        return '1 tarefa para finalizar o dia.'
      }

      return `${remaining} tarefas para finalizar o dia.`
    },
    hasRemaining () {
      const { remaining } = this

      return remaining > 0
    },
    remaining () {
      const { tasks } = this

      const total = countBy(tasks, 'today_is_done')

      return total.false
    }
  },
  data: () => ({
    today: '',
    tasks: []
  }),
  methods: {
    getAll () {
      TaskService.getAll({ filter: { today: true } })
        .then(({ data, today }) => {
          this.today = today
          this.tasks = data
        })
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>

<template>
  <section>
    <div class="container" v-if="tasks.length">
      <div class="row">
        <div class="col-md-7 tarefas-col">
          <h2></h2>
          <p class="text-info">{{ todayIs }}</p>
          <p>Suas tarefas são:</p>
          <div class="row">
            <div class="col-8">
              <template v-for="task in tasks">
                <task-toggle class="custom-control custom-checkbox" v-bind:key="task.id" v-bind="{ task }"></task-toggle>
              </template>
            </div>
          </div>
          <div class="pt-2 pb-2">
            <p class="text-info" v-if="hasRemaining">{{ messageRemaining }}</p>
            <p class="text-success" v-else>Muito bom! Hora de descansar!</p>
          </div>
        </div>
        <div class="col-md-5 citacao-col" v-if="false">
          <h2>Citação do Dia</h2>
          <blockquote class="blockquote">
            <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>
