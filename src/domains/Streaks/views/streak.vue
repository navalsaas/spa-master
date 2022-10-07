<script>
import FInput from '@/components/forms/f-input'
import StreakService from '@/domains/Streaks/services'
import { clone } from 'lodash'

export default {
  name: 'streak',
  components: {
    FInput
  },
  computed: {
    days () {
      const { streak } = this

      if (streak.streak_days === 1) {
        return 'Você está a 1 dia nesse streak'
      }

      return `Você está a ${streak.streak_days} dias nesse streak`
    }
  },
  data: () => ({
    streakUpdated: false,
    streak: {
      id: null,
      title: null,
      date_start: null,
      date_end: null
    }
  }),
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.streak = this.value
    setTimeout(() => {
      this.streakUpdated = true
    }, 100)
  },
  watch: {
    streak: {
      handler: function () {
        if (this.streakUpdated) {
          this.update()
        }
      },
      deep: true
    }
  },
  methods: {
    doConfirmation () {
      this.$confirm({
        title: this.streak.title,
        message: 'Deseja exxcluir este streak?',
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
      StreakService.delete(this.streak)
        .then(({ data }) => {
          this.$emit('delete', this.streak)
        })
        .catch(() => {
          alert('Ocorreu um erro na exclusão')
        })
    },
    update () {
      this.streakUpdated = false
      const streak = clone(this.streak)
      delete streak.icon
      delete streak.streak_days
      if (!streak.date_end) {
        delete streak.date_end
      }
      StreakService.update(streak)
        .then(({ data }) => {
          this.streak = data
          setTimeout(() => {
            this.streakUpdated = true
          }, 100)
        })
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <FInput v-model="streak.title"></FInput>
      <div class="pull-right">
        <a href="#" v-on:click="doConfirmation">
          <ion-icon name="trash-outline"></ion-icon>
        </a>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text" data-editable-2></p>
      <div class="text-center">
        <ion-icon :name="streak.icon" size="large"></ion-icon>
      </div>
      <div class="text-center text-info">
        <p>{{ days }}</p>
      </div>
      <form>
        <div class="form-group">
          <label for="date_start">Inicio</label>
          <input type="date" class="form-control" id="date_start" placeholder="" v-model="streak.date_start">
          <small id="dateStartHelp" class="form-text text-muted">Insira a data que comecou o streak</small>
        </div>
        <div class="d-none form-group">
          <label for="date_end">Fim</label>
          <input type="date" class="form-control" id="date_end" placeholder="" v-model="streak.date_end">
          <small id="dateEndHelp" class="form-text text-muted">Insira a data que terminou o streak</small>
        </div>
      </form>
    </div>
  </div>
</template>
