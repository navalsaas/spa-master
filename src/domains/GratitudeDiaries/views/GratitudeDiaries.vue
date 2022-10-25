<script>
import GratitudeFormCreate from './gratitude-form-create'
import GratitudeDiary from './gratitude-diary'
import GratitudeList from './gratitudes-list'
import { mapActions } from 'vuex'

export default {
  name: 'GratitudeDiaries',
  data: () => ({
    date: null,
    gratitude: {
      id: null,
      what: null,
      date: null
    }
  }),
  components: {
    GratitudeFormCreate,
    GratitudeDiary,
    GratitudeList
  },
  methods: {
    ...mapActions('gratitudeDiaries', ['loadGratitudes', 'create']),
    remove () {
      this.loadGratitudes()
    }
  },
  mounted () {
    this.loadGratitudes()
  },
  watch: {
    date (date) {
      this.loadGratitudes({ filter: { date }, page: 1 })
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="container">
      <section>
        <div class="row">
          <div class="col">
            <h1>Diário de Gratidão</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <gratitude-form-create></gratitude-form-create>
            <div class="row">
              <div class="col-md-4 align-self-center ">
              <span>Escolha uma data:</span>
              <div class="d-flex h6">
                <input type="date" class="form-control" id="" placeholder="" v-model="date" />
              </div>
              </div>
              <div class="col-md-8">
                <gratitude-diary v-on:delete="remove"></gratitude-diary>
              </div>
            </div>
            <GratitudeList></GratitudeList>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
