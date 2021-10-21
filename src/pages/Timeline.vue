<!--新闻浏览-->
<template>
  <q-page class="test flex flex-center">
    <div id="map"></div>
  </q-page>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { defineComponent, ref, onMounted } from 'vue'

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2l2aXRhc3YiLCJhIjoiY2s3YXBvdDU1MTZpdDNlcDVhb3FrbjdtaiJ9.kLk_w4wIjIQ6dunGULViqw'

export default defineComponent({
  name: 'PageIndex',

  setup () {
    let map = ref(null)
    const initMap = () => {
      map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      })
    }

    onMounted(initMap)

    return { map, initMap }
  }
})
</script>

<style lang="sass" scoped>
.test
  font-size: 15px

#map
  position: absolute
  top: 0
  bottom: 0
  width: 100%
  height: 100%
</style>
