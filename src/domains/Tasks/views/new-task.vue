<script>
import AreaSelect from '@/domains/Areas/views/select'
import { isEmpty, map } from 'lodash'
import Multiselect from 'vue-multiselect'
import TaskService from '@/domains/Tasks/services'

export default {
  name: 'new-task',
  components: {
    AreaSelect,
    Multiselect
  },
  computed: {
    invalidForm () {
      const { task } = this

      return isEmpty(task.area_id) || isEmpty(task.name) || isEmpty(task.days)
    }
  },
  data: () => ({
    days: [],
    task: {
      id: null,
      area_id: null,
      name: null,
      days: [],
      order: 0
    },
    options: [
      {
        days: 'Dias úteis',
        libs: [
          { name: 'Segunda', value: 'monday' },
          { name: 'Terça', value: 'tuesday' },
          { name: 'Quarta', value: 'wednesday' },
          { name: 'Quinta', value: 'thursday' },
          { name: 'Sexta', value: 'friday' }
        ]
      },
      {
        days: 'Final de semana',
        libs: [
          { name: 'Sábado', value: 'saturday' },
          { name: 'Domingo', value: 'sunday' }
        ]
      }
    ]
  }),
  watch: {
    days: {
      handler: function () {
        this.setDays()
      },
      deep: true
    }
  },
  mounted () {
    /*
    const days = {
      monday: 'Segunda',
      tuesday: 'Terça',
      wednesday: 'Quarta',
      thursday: 'Quinta',
      friday: 'Sexta',
      saturday: 'Sábado',
      sunday: 'Domingo'
    }

    this.days = map(['tuesday', 'wednesday', 'thursday'], (day) => ({
      value: day,
      name: days[day]
    }))
    */
  },
  methods: {
    doSave () {
      const { invalidForm } = this

      if (invalidForm) {
        return
      }
      TaskService.create(this.task)
        .then(({ data: task }) => {
          this.days = []
          this.task = {
            id: null,
            area_id: task.area.id,
            name: null,
            days: [],
            order: 0
          }
          this.$emit('new-task', task)
        })
    },
    setDays () {
      const { days } = this

      this.task.days = map(days, ({ value }) => value)
    }
  }
}
</script>

<template>
  <form class="form-inline">
    <div class="form-group mb-2">
      <label for="taskName" class="sr-only">Tarefa</label>
      <input v-model="task.name" type="text" class="form-control" id="taskName" placeholder="Nova tarefa">
    </div>
    <div class="form-group mx-sm-2 mb-2">
      <AreaSelect v-model="task.area_id" />
    </div>
    <div class="form-group mb-3">
      <multiselect
        v-model="days"
        :options="options"
        :limit="5"
        selectLabel="Selecionar"
        selectedLabel="Selecionado"
        deselectLabel="Deselecionar"
        deselectGroupLabel="Deselecionar grupo"
        selectGroupLabel="Selecionar grupo"
        :multiple="true"
        :searchable="true"
        :limitText="count => `+ ${count}`"
        :close-on-select="false"
        group-values="libs"
        group-label="days"
        :group-select="true"
        placeholder="Em quais dias?"
        track-by="name"
        label="name">
      </multiselect>
    </div>
    <button v-on:click="doSave" type="button" class="btn btn-primary mb-2 mx-sm-2" :class="{ disabled: invalidForm }">Criar</button>
  </form>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
