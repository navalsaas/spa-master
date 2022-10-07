<script>
import Paginate from '@/components/paginate'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'gratitudes-list',
  components: {
    Paginate
  },
  computed: {
    ...mapGetters('gratitudeDiaries', ['gratitudes', 'today', 'paginate'])
  },
  methods: {
    ...mapActions('gratitudeDiaries', ['setGratitudeDay', 'setPage'])
  }
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <p class="h5">Log de Registros:</p>
      <small>Clique para ver ou alterar</small>
      <ul>
        <template v-for="gratitude in gratitudes">
          <a href="#" v-on:click="setGratitudeDay(gratitude)" v-bind:key="gratitude.id" v-if="gratitude.date">
            <li>{{ gratitude._parse_date }}</li>
          </a>
        </template>
      </ul>
      <paginate :value="paginate" v-on:change-page="setPage"></paginate>
    </div>
  </div>
</template>
