<script>
export default {
  name: 'f-textarea',
  props: [
    'value'
  ],
  data: () => ({
    edit: false,
    textareaValue: null
  }),
  mounted () {
    this.textareaValue = this.value
  },
  watch: {
    value: {
      handler: function (newValue, oldValue) {
        if (newValue === '') {
          this.textareaValue = oldValue
          return
        }
        this.textareaValue = this.value
      },
      deep: true
    }
  },
  methods: {
    onUpdate () {
      this.edit = true
      setTimeout(() => {
        this.$refs.textarea.focus()
        this.$refs.textarea.select()
      }, 100)
    },
    setUpdate () {
      this.$emit('input', this.textareaValue)
      this.edit = false
    }
  }
}
</script>

<template>
  <span class="box-textarea">
    <p class="card-text" style="white-space: pre-line" v-on:click="onUpdate" v-if="!edit">{{ textareaValue || 'Adicione um comentário' }}</p>
    <textarea class="box-textarea card-text" rows="10" v-model="textareaValue" ref="textarea" v-if="edit" v-on:blur="setUpdate"></textarea>
  </span>
</template>

<style scoped>
.box-textarea {
  width:100%;
}
</style>
