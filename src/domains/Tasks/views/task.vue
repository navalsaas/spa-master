<script>
import AreaSelect from '@/domains/Areas/views/select'
import FInput from '@/components/forms/f-input'
import { get, size, map } from 'lodash'
import TaskService from '@/domains/Tasks/services'
import Multiselect from 'vue-multiselect'

const dayOptions = {
  monday: 'segunda',
  tuesday: 'terça',
  wednesday: 'quarta',
  thursday: 'quinta',
  friday: 'sexta',
  saturday: 'sábado',
  sunday: 'domingo'
}

export default {
  name: 'task-item',
  components: {
    AreaSelect,
    FInput,
    Multiselect
  },
  computed: {
    areaName () {
      return get(this.task, 'area.name')
    },
    days () {
      const days = get(this.task, 'days', [])

      if (size(days) === 7) {
        return 'todos os dias'
      }

      return map(days, day => dayOptions[day]).join(', ')
    }
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        task: {
          id: null,
          area_id: null,
          name: null,
          days: [],
          order: null
        }
      })
    }
  },
  data: () => ({
    multiDays: [],
    editArea: false,
    editDays: false,
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
    multiDays: {
      handler: function () {
        this.setDays()
      },
      deep: true
    },
    'task.name': 'updateTask',
    'task.area_id': 'updateTask'
  },
  methods: {
    setDays () {
      const { multiDays } = this

      this.task.days = map(multiDays, ({ value }) => value)

      this.updateTask()
    },
    onEditArea () {
      this.editArea = true
    },
    onEditDays () {
      this.editDays = true
    },
    updateTask (task, old) {
      TaskService.update(this.task)
        .then(({ data }) => {
          this.task.area = data.area
          this.editArea = false
          // this.editDays = false
        })
        .catch(() => {
          alert('Ocorreu um erro na alteração, todos os dados são obrigatórios')
        })
    },
    doConfirmation () {
      this.$confirm({
        title: this.task.name,
        message: 'Deseja exxcluir esta tarefa?',
        button: {
          yes: 'Sim',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm) {
            this.doDelete()
          }
        }
      })
    },
    doDelete () {
      TaskService.delete(this.task)
        .then(({ data }) => {
          this.$emit('delete', this.task)
        })
        .catch(() => {
          alert('Ocorreu um erro na exclusão')
        })
    }
  },
  mounted () {
    const days = {
      monday: 'Segunda',
      tuesday: 'Terça',
      wednesday: 'Quarta',
      thursday: 'Quinta',
      friday: 'Sexta',
      saturday: 'Sábado',
      sunday: 'Domingo'
    }

    this.multiDays = map(this.task.days, (day) => ({
      value: day,
      name: days[day]
    }))
  }
}
</script>

<template>
  <div class="tarefas">
    <div class="card">
      <FInput v-model="task.name">{{ task.name }}</FInput>
      <div class="pull-right">
        <a href="#" v-on:click="doConfirmation">
          <ion-icon name="trash-outline"></ion-icon>
        </a>
      </div>
    </div>
    <AreaSelect v-model="task.area_id" v-if="editArea" />
    <span class="badge badge-danger cursor" v-else v-on:click="onEditArea">{{ areaName }}</span>&nbsp;
    <multiselect
        v-model="multiDays"
        :options="options"
        :limit="5"
        selectLabel="Selecionar"
        selectedLabel="Selecionado"
        deselectLabel="Deselecionar"
        deselectGroupLabel="Selecionar grupo"
        selectGroupLabel="Selecionar grupo"
        :multiple="true"
        :searchable="true"
        :limitText="count => `+ ${count}`"
        group-values="libs"
        group-label="days"
        :group-select="true"
        placeholder="Em quais dias?"
        track-by="name"
        label="name"
        v-if="editDays"
      >
      </multiselect>
    <span class="badge badge-info cursor" v-else v-on:click="onEditDays">{{ days }}</span>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  .cursor {
    cursor: pointer;
  }
</style>
