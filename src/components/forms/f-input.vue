<script>
export default {
  name: 'f-input',
  props: [
    'value'
  ],
  data: () => ({
    edit: false,
    inputValue: null
  }),
  mounted () {
    this.inputValue = this.value
  },
  methods: {
    onUpdate () {
      this.edit = true
      setTimeout(() => {
        this.$refs.input.focus()
        this.$refs.input.select()
      }, 100)
    },
    setUpdate () {
      if (this.inputValue !== '') {
        this.$emit('input', this.inputValue)
      }
      this.edit = false
    }
  },
  watch: {
    inputValue: {
      handler: function (newValue, oldValue) {
        if (newValue === '') {
          setTimeout(() => {
            this.inputValue = this.value
          }, 500)
        }
      },
      deep: true
    }
  }
}
</script>

<template>
  <span class="box-input">
    <p class="card-title" v-on:click="onUpdate" v-if="!edit">{{ inputValue }}</p>
    <input class="box-input card-title" v-model="inputValue" ref="input" v-if="edit" v-on:blur="setUpdate" v-on:keydown.enter.prevent="setUpdate" />
  </span>
</template>

<style scoped>
.box-input {
  width:100%;
}
</style>
