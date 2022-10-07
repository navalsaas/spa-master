<script>
import FInput from '@/components/forms/f-input'
import FTextarea from '@/components/forms/f-textarea'
import GoalService from '@/domains/Goals/services'

export default {
  name: 'goal',
  components: {
    FInput,
    FTextarea
  },
  props: {
    goal: {
      type: Object,
      required: true
    }
  },
  methods: {
    doConfirmation () {
      this.$confirm({
        title: this.goal.title,
        message: 'Deseja exxcluir este objetivo?',
        button: {
          yes: 'Sim',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm) {
            this.doDelete()
          }
        }
      })
    },
    doDelete () {
      GoalService.delete(this.goal)
        .then(({ data }) => {
          this.$emit('delete', this.goal)
        })
        .catch(() => {
          alert('Ocorreu um erro na exclusão')
        })
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="mouse-over">
      <FInput v-model="goal.title"></FInput>
      <div class="pull-right">
        <a href="#" v-on:click="doConfirmation">
          <ion-icon name="trash-outline"></ion-icon>
        </a>
      </div>
    </div>
    </div>
    <div class="card-body">
      <div class="text-center">
        <ion-icon :name="goal.icon" size="large"></ion-icon>
      </div>
      <div class="mouse-over"><FTextarea v-model="goal.comments"></FTextarea></div>
    </div>
  </div>
</template>
