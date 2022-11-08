<script>
import AreaSelect from '@/domains/Areas/views/select'
import StreakService from '@/domains/Streaks/services'
import { isEmpty } from 'lodash'

export default {
  name: 'streak-form-create',
  components: {
    AreaSelect
  },
  data: () => ({
    streak: {
      area_id: null,
      title: '',
      date_start: null
    }
  }),
  computed: {
    invalidForm () {
      const { streak } = this

      return isEmpty(streak.area_id) || isEmpty(streak.title) || isEmpty(streak.date_start)
    }
  },
  methods: {
    onSave () {
      const { invalidForm } = this

      if (invalidForm) {
        return
      }

      StreakService.create(this.streak)
        .then(({ data }) => {
          console.log({ data })
          this.$emit('reload', true)

          this.streak = {
            area_id: this.streak.area_id,
            title: '',
            date_start: null
          }
        })
        .catch(({ response }) => {
          console.log({ response })
        })
    }
  }
}
</script>

<template>
  <form class="form-inline mb-4">
    <div class="form-group mb-2">
      <label for="title" class="sr-only">Streaks</label>
      <input type="" class="form-control" id="title" placeholder="Qual seu streak" v-model="streak.title">
    </div>
    <div class="form-group mb-2 mx-sm-3">
      <label for="date_start">Inicio:</label>
      <input type="date" class="form-control" id="date_start" placeholder="" v-model="streak.date_start">
    </div>
    <div class="form-group mx-sm-3 mb-2">
      <AreaSelect v-model="streak.area_id" />
    </div>
    <button type="button" class="btn btn-primary mb-2" :class="{ disabled: invalidForm }" v-on:click="onSave">Criar</button>
  </form>
</template>
