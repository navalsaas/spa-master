<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { get } from 'lodash'

export default {
  name: 'gratitude-diary',
  computed: {
    ...mapGetters('gratitudeDiaries', ['parseToday', 'gratitudeDay']),
    date () {
      const date = get(this.gratitude, 'date')

      if (!date) {
        return date
      }

      return moment(date).format('DD/MM/YYYY')
    }
  },
  data: () => ({
    edit: false,
    editDate: false,
    gratitude: {
      id: null,
      what: null,
      date: null
    }
  }),
  watch: {
    gratitudeDay: {
      handler (gratitude) {
        this.setGratitude(gratitude)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('gratitudeDiaries', ['update']),
    setGratitude (gratitude) {
      this.gratitude = { ...gratitude }
    },
    onUpdate () {
      this.edit = true
      setTimeout(() => {
        this.$refs.what.focus()
        this.$refs.what.select()
      }, 100)
    },
    onUpdateDate () {
      this.editDate = true
      setTimeout(() => {
        this.$refs.date.focus()
        this.$refs.date.select()
      }, 100)
    },
    setUpdate () {
      this.edit = false
      this.update(this.gratitude)
        .catch(({ response }) => {
        })
    },
    setUpdateDate () {
      this.editDate = false
      const { date } = this.gratitude

      this.update({ ...this.gratitude, date })
        .catch(() => {
          alert('Informe uma data válida')

          this.gratitude = { ...this.gratitude, date }
        })
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <p class="card-title">Veja sua gratidão desse dia:</p>
    </div>
    <div class="card-body">
      <p class="text-danger" v-if="!gratitude.id">Nenhum registro encontrado para {{ parseToday }}.</p>
      <span class="box-textarea mouse-over">
        <p v-on:click="onUpdateDate" v-if="!editDate" class="date">{{ date }}</p>
        <input type="date" class="date card-title" v-model="gratitude.date" ref="date" v-if="editDate" v-on:blur="setUpdateDate" />
        <p class="card-title" v-on:click="onUpdate" v-if="!edit">{{ gratitude.what }}</p>
        <textarea maxlength="250" class="box-textarea card-text" rows="10" v-model="gratitude.what" ref="what" v-if="edit" v-on:blur="setUpdate"></textarea>
      </span>
    </div>
  </div>
</template>

<style scoped>
.box-textarea {
  width:100%;
}
.date {
  color: red;
  float: right;
  clear: both;
  text-align: right;
}
</style>
