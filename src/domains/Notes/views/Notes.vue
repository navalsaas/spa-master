<script>
import NoteService from '@/domains/Notes/services'
import Note from './note'
import { chunk, filter, size, remove, isEmpty } from 'lodash'

export default {
  name: 'notes',
  computed: {
    submitValid () {
      const { title } = this

      return !isEmpty(title)
    },
    hasNoFixes () {
      const { noFixes } = this

      return size(noFixes) > 0
    },
    hasFixes () {
      const { fixes } = this

      return size(fixes) > 0
    },
    fixes () {
      const { favorites } = this

      return chunk(favorites, 3)
    },
    favorites () {
      const { notes } = this

      return filter(notes, note => note.favorite === true)
    },
    noFixes () {
      const { noFavorites } = this

      return chunk(noFavorites, 3)
    },
    noFavorites () {
      const { notes } = this

      return filter(notes, note => note.favorite === false)
    }
  },
  components: {
    Note
  },
  data: () => ({
    notes: [],
    title: null
  }),
  mounted () {
    this.getAll()
  },
  methods: {
    removeNote (note) {
      const { notes } = this

      remove(notes, note)

      this.notes = [...notes]
    },
    getAll () {
      NoteService.getAll()
        .then(({ data }) => {
          this.notes = []
          const notes = [...data]

          this.notes = [...notes]
        })
    },
    doCreate () {
      const { submitValid } = this

      if (!submitValid) {
        return
      }
      NoteService.create({ title: this.title })
        .then(({ data }) => {
          this.title = null
          this.notes.unshift(data)
        })
        .catch(() => {
        })
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <section>
      <div class="container">
          <div class="row">
            <div class="col">
                <h1>Anotações</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <form class="form-inline mb-4">
                <div class="form-group mb-2">
                    <label for="title" class="sr-only">Anotação</label>
                    <input v-model="title" type="" class="form-control" id="title" placeholder="O que quer anotar?" required>
                </div>
                <button type="button" class="btn btn-primary mb-2 mx-sm-3" v-on:click="doCreate" :class="{ disabled: !submitValid }">Criar</button>
              </form>
              <template v-if="hasFixes">
                <div class="row">
                <div class="col h6">Fixas</div>
                </div>
                <template v-for="(items, key) in fixes">
                  <div class="row" v-bind:key="'fixes_' + key">
                    <template v-for="note in items">
                      <Note v-bind:key="note.id" v-bind="{ note }" v-on:delete="removeNote"></Note>
                    </template>
                  </div>
                </template>
              </template>
              <template v-if="hasNoFixes">
                <div class="row">
                <div class="col h6">Outras</div>
                </div>
                <template v-for="(items, key) in noFixes">
                  <div class="row" v-bind:key="'nofixes_' + key">
                    <template v-for="note in items">
                      <Note v-bind:key="note.id" v-bind="{ note }" v-on:delete="removeNote"></Note>
                    </template>
                  </div>
                </template>
              </template>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>
