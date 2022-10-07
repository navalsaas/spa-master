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
      'battery-full',
      'beer',
      'bicycle',
      'boat',
      'bonfire',
      'book',
      'briefcase',
      'brush',
      'build',
      'camera',
      'car-sport',
      'game-controller',
      'football',
      'heart',
      'home',
      'leaf',
      'moon',
      'musical-notes',
      'paw',
      'pulse',
      'trophy',
      'wine',
      'star'
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
    setIcon (icon) {
      this.currentIcon = icon
      AreaService.update({ id: this.currentArea.id, icon: icon })
        .then(() => {
          this.getAll()
        })
    },
    getAll () {
      AreaService.getAll()
        .then(({ data }) => {
          this.areas = data
        })
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
                  <ion-icon v-for="(name, index) in icons" :name="name" size="large" v-bind:key="index" style="cursor: pointer;" v-on:click="setIcon(name)"></ion-icon>
                </div>
                <div class="col-md-5 align-self-center">
                  <div class="escolha-icone rounded text-center">
                    <ion-icon v-if="currentIcon" :name="currentIcon" size="large"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Salvar e fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
