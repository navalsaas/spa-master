<script>
import AreaService from '@/domains/Areas/services'
import FInput from '@/components/forms/f-input'
import FTextarea from '@/components/forms/f-textarea'

export default {
  name: 'root-area',
  components: {
    FInput,
    FTextarea
  },
  props: {
    area: {
      type: Object,
      required: true
    }
  },
  watch: {
    area: {
      handler: 'updateArea',
      deep: true
    }
  },
  methods: {
    updateArea () {
      AreaService.update(this.area)
        .then(() => {
        })
        .catch(() => {
          alert('Ocorreu um erro ao salvar a área')
        })
    },
    getImgUrl (pet) {
      var images = require.context('../../../assets/', false, /\.png$/)
      return images('./' + pet + '.png')
    }
  }
}
</script>

<template>
  <div class="col-md-3">
    <div class="card mt-2">
      <div class="card-header">
        <div class="mouse-over"><FInput v-model="area.name">{{ area.name }}</FInput></div>
      </div>
      <div class="card-body">
        <a href="#" data-toggle="modal" data-target="#areaModal">
          <div class="text-center" v-if="area.id" v-on:click="$emit('update-icon', area)">
            <img class="icon bg-primary-2" :src="getImgUrl(area.icon)" style="max-height: 40px;"/>
          </div>
        </a>
        <FTextarea class="card-text" v-model="area.comments"></FTextarea>
      </div>
    </div>
  </div>
</template>
