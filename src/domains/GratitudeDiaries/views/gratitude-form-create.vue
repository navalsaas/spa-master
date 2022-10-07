<script>
import { mapActions } from 'vuex'
import { isEmpty, size } from 'lodash'

export default {
  name: 'gratitude-form-create',
  computed: {
    invalidForm () {
      const { what } = this

      return isEmpty(what) || size(what) < 3
    }
  },
  data: () => ({
    what: null
  }),
  methods: {
    ...mapActions('gratitudeDiaries', ['create']),
    doCreate () {
      const { what, invalidForm } = this
      if (invalidForm) {
        return
      }
      this.create({ what })
        .then((data) => {
          this.what = null
        })
        .catch((error) => {
          console.log('error', { error })
        })
    }
  }

}
</script>

<template>
  <form class="form-inline mb-4">
    <div class="form-group mb-2">
        <label for="what" class="sr-only">Gratidão</label>
        <input class="form-control" id="what" placeholder="Sou grato hoje por..." v-model="what">
    </div>
    <button type="button" class="btn btn-primary mb-2 mx-sm-3" :class="{ disabled: invalidForm }" v-on:click="doCreate">Criar</button>
  </form>
</template>
