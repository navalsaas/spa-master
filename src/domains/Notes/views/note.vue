<script>
import NoteService from '@/domains/Notes/services'
import FInput from '@/components/forms/f-input'
import FTextarea from '@/components/forms/f-textarea'
import { get } from 'lodash'

export default {
  name: 'note',
  components: {
    FInput,
    FTextarea
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  computed: {
    heart () {
      const heart = get(this.note, 'favorite', false)

      if (heart) {
        return 'heart'
      }

      return 'heart-outline'
    }
  },
  watch: {
    note: {
      handler: 'updateNote',
      deep: true
    }
  },
  data: () => ({
    deleted: false
  }),
  methods: {
    doConfirmation () {
      this.$confirm({
        title: this.note.title,
        message: 'Deseja exxcluir esta anotação?',
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
      NoteService.delete(this.note)
        .then(({ data }) => {
          this.$emit('delete', this.note)
        })
        .catch(() => {
          alert('Ocorreu um erro na exclusão')
        })
        // this.$emit('input', note)
    },
    setFavorite () {
      this.note.favorite = !this.note.favorite
      this.updateNote({ id: this.note.id, favorite: this.note.favorite })
    },
    updateNote (note) {
      console.log({ note })
      NoteService.update(note)
        .then(({ data }) => {
        })
        .catch(() => {
          alert('Ocorreu um erro na atualização')
        })
        // this.$emit('input', note)
    }
  }
}
</script>

<template>
  <div class="col-md-4 p-2" v-if="!deleted">
    <div class="card">
      <div class="card-header">
        <div class="mouse-over"><FInput v-model="note.title">{{ note.title }}</FInput></div>
        <div class="pull-right">
          <div class="float-right ml-2 mouse-over"><ion-icon :name="heart" v-on:click="setFavorite"></ion-icon></div>
          <a href="#" v-on:click="doConfirmation">
            <ion-icon name="trash-outline"></ion-icon>
          </a>
        </div>
      </div>
      <div class="card-body">
        <div class="mouse-over"><FTextarea class="card-text" v-model="note.note"></FTextarea></div>
      </div>
    </div>
  </div>
</template>
