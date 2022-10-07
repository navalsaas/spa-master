<script>
import AreaSelect from '@/domains/Areas/views/select'
import Goal from './goal'
import { isEmpty, chunk, remove } from 'lodash'
import GoalService from '@/domains/Goals/services'

export default {
  name: 'goals',
  data: () => ({
    goals: [],
    goal: {
      area_id: null,
      title: null
    }
  }),
  computed: {
    chunkGoals () {
      const { goals } = this

      return chunk(goals, 3)
    },
    submitValid () {
      const { goal } = this

      return !isEmpty(goal.area_id) && !isEmpty(goal.title)
    }
  },
  components: {
    AreaSelect,
    Goal
  },
  methods: {
    removeGoal (goal) {
      const { goals } = this

      remove(goals, goal)

      this.goals = [...goals]
    },
    doCreate () {
      const { submitValid } = this

      if (!submitValid) {
        return
      }

      GoalService.create(this.goal)
        .then(({ data }) => {
          this.goal.title = null
          this.goals.unshift(data)
        })
        .catch(() => {
          alert('Houve uma falha na criação do objetivo')
        })
    }
  },
  mounted () {
    GoalService.getAll()
      .then(({ data }) => {
        this.goals = data
      })
  }
}
</script>

<template>
  <div class="container-fluid">
    <section>
    <div class="container">
      <div class="row">
        <div class="col">
        <h1>Objetivos</h1>
      </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form class="form-inline mb-4">
          <div class="form-group mb-2">
            <label for="goalTitle" class="sr-only">Objetivo</label>
            <input v-model="goal.title" type="" class="form-control" id="goalTitle" placeholder="Qual seu objetivo?">
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <AreaSelect v-model="goal.area_id"></AreaSelect>
          </div>
          <button type="button" class="btn btn-primary mb-2" :class="{ disabled: !submitValid }" v-on:click="doCreate">Criar</button>
        </form>
        <template v-for="(goals, index) in chunkGoals">
          <div class="row p-2" v-bind:key="index">
            <div class="col-md-4" v-for="goal in goals" v-bind:key="goal.id">
              <Goal v-bind="{ goal }" v-on:delete="removeGoal"/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
  </div>
</template>
