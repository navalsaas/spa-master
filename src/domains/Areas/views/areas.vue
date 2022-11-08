<script>
import Area from './area'
import AreaService from '@/domains/Areas/services'

export default {
  name: 'areas',
  components: {
    Area
  },
  data: () => ({
    currentIcon: null,
    icons: [
      'airplane',
      'barbell',
      'battery',
      'beer',
      'bicycle',
      'boat',
      'bonfire',
      'book',
      'briefcase',
      'brush',
      'build',
      'camera',
      'car',
      'game',
      'football',
      'heart',
      'home',
      'leaf',
      'moon',
      'musical',
      'paw',
      'pulse',
      'trophy',
      'wine',
      'star',
      'help1',
      'help2',
      'help3',
      'help4',
      'help5',
      'help6',
      'help7',
      'help8',
      'help9',
      'help10',
      'help11',
      'help12',
      'help13',
      'help14',
      'help15',
      'help16'
    ],
    currentArea: {
      id: null,
      name: null,
      comments: null
    },
    areas: []
  }),
  methods: {
    setCurrentArea (area) {
      this.currentArea = area
    },
    setIcon () {
      AreaService.update({ id: this.currentArea.id, icon: this.currentIcon })
        .then(() => {
          this.getAll()
        })
    },
    getAll () {
      AreaService.getAll()
        .then(({ data }) => {
          this.areas = data
        })
    },
    add () {
      AreaService.create()
        .then(() => {
          this.getAll()
        })
    },
    getImgUrl (pet) {
      var images = require.context('../../../assets/', false, /\.png$/)
      return images('./' + pet + '.png')
    }
  },
  computed: {
    classObject () {
      return {
        'mt-5': this.areas.length > 4,
        'mt-3': this.areas.length <= 4,
        'ml-3': this.areas.length <= 4
      }
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>
<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Areas da minha Vida</h1>
        </div>
      </div>
      <div class="row">
        <Area v-for="(area, index) in areas" v-bind="{ area }" v-bind:key="index" v-on:update-icon="setCurrentArea" />
        <div v-if="this.areas.length < 6">
          <button type="button" class="btn btn-default btn-circle align-bottom" :class="classObject">
            <ion-icon name="add-circle-outline" size="small" style="cursor: pointer;" v-on:click="add()"></ion-icon>
          </button>
        </div>
      </div>
      <!-- Icon Picker Modal Start -->
      <div class="modal fade" id="areaModal" tabindex="-1" role="dialog" aria-labelledby="areaModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="areaModalLabel">Seleção o icone da sessao</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-7">
                  <img
                    v-for="(name, index) in icons"
                    :name="name"
                    v-bind:key="index"
                    class="icon bg-primary-2"
                    v-on:click="currentIcon = name"
                    :src="getImgUrl(name)"
                    style="max-height: 35px; cursor: pointer;"
                  />
                </div>
                <div class="col-md-5 align-self-center">
                  <div class="escolha-icone rounded text-center">
                    <img
                      v-if="currentIcon"
                      :name="currentIcon"
                      v-bind:key="index"
                      :src="getImgUrl(currentIcon)"
                      style="max-height: 40px;"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="setIcon" data-dismiss="modal">Salvar e fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
</style>
