<script>
export default {
  name: 'page',
  props: {
    page: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    setPage (page) {
      this.$emit('page', page)
    }
  }
}
</script>

<template>
  <li class="page-item active" aria-current="page" v-if="page === currentPage">
    <a class="page-link cursor-default" aria-disabled="true" >{{ page }}</a>
  </li>
  <li class="page-item" v-else>
    <a class="page-link" href="#" v-on:click="setPage(page)">{{ page }}</a>
  </li>
</template>

<style scoped>
  .cursor-default {
    cursor: default;
  }
</style>
