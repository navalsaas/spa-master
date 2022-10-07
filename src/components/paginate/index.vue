<script>
import Page from './page'
import { range } from 'lodash'

export default {
  name: 'paginate',
  components: {
    Page
  },
  computed: {
    disablePreviousPage () {
      const { paginate } = this

      return paginate.current_page === 1
    },
    disableNextPage () {
      const { paginate } = this

      return paginate.last_page === paginate.current_page
    },
    pages () {
      const { paginate } = this

      return range(1, paginate.last_page + 1)
    },
    currentPage () {
      const { paginate } = this

      return paginate.current_page || 1
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    paginate: {
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: 20
    }
  }),
  mounted () {
    this.paginate = { ...this.value }
  },
  watch: {
    value: {
      handler: function () {
        this.paginate = { ...this.value }
      },
      deep: true
    }
  },
  methods: {
    onChangePage (page) {
      const { currentPage } = this
      if (page !== currentPage) {
        this.$emit('change-page', page)
      }
    }
  }
}
</script>

<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: disablePreviousPage }">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true" v-on:click="onChangePage(currentPage - 1)">Anterior</a>
      </li>
      <template v-for="page in pages">
        <page :key="page" v-bind="{ page, currentPage }" v-on:page="onChangePage"></page>
      </template>
      <li class="page-item" :class="{ disabled: disableNextPage }">
        <a class="page-link" href="#" v-on:click="onChangePage(currentPage + 1)">Próxima</a>
      </li>
    </ul>
  </nav>
</template>
