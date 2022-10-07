<script>
import AreaService from '@/domains/Areas/services'
import { get, find } from 'lodash'

export default {
  name: 'area-select',
  data: () => ({
    areas: [],
    currentArea: {
      id: null
    }
  }),
  props: ['value'],
  computed: {
    areaLabel () {
      const { currentArea } = this

      return get(currentArea, 'name', 'Escolher uma área')
    }
  },
  mounted () {
    this.currentArea.id = this.value
    AreaService.getAll()
      .then(({ data }) => {
        this.areas = data
        const area = find(data, item => item.id === this.currentArea.id)
        if (area) {
          this.currentArea = area
        }
      })
      .catch(() => {
        alert('Houve um erro na busca por áreas')
      })
  },
  methods: {
    setArea (area) {
      this.currentArea = area
      this.$emit('input', area.id)
    }
  }
}
</script>

<template>
  <div class="btn-group">
    <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ areaLabel }}
    </button>
    <div class="dropdown-menu">
      <a v-for="area in areas" v-bind:key="area.id" class="dropdown-item" href="#" v-on:click="setArea(area)">{{ area.name }}</a>
    </div>
  </div>
</template>
