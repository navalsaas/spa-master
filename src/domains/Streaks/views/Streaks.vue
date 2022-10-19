<script>
import StreakFormCreate from './streak-form-create'
import Streak from './streak'
import StreakService from '@/domains/Streaks/services'
import { remove } from 'lodash'

export default {
  name: 'streaks',
  data: () => ({
    streaks: []
  }),
  components: {
    StreakFormCreate,
    Streak
  },
  methods: {
    getAll () {
      StreakService.getAll()
        .then(({ data }) => {
          this.streaks = data
        })
        .catch(({ response }) => {
          console.log({ response })
        })
    },
    removeStreak (streak) {
      const { streaks } = this

      remove(streaks, streak)

      this.streaks = [...streaks]
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>
<template>
  <div class="container-fluid">
    <!-- Section 1 START -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Streaks</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <streak-form-create v-on:reload="getAll"></streak-form-create>
            <div class="row">
              <div class="col-md-4 p-2" v-for="streak in streaks" v-bind:key="streak.id">
                <streak v-bind="{ value: streak }" v-on:delete="removeStreak"></streak>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section 1 END -->
  </div>
</template>
