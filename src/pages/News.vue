<!--新闻浏览-->
<template>
  <q-page class="container">
    <div id="map"></div>
    <div :class="['news', { 'toggle-news': arrow }]" v-show="show">
      <!---->
      <q-card class="select">
        <div class="card-arrow">
          <q-btn
            round
            glossy
            color="primary"
            icon="expand_more"
            @click="toggleNewsHeight"
            v-show="arrow"
          />
        </div>
        <div class="header bg-transparent">
          <img
            class="image"
            :src="select.image"
            v-show="arrow"
            @click="toggleNews"
          />

          <div class="arrow row justify-center">
            <q-icon
              size="md"
              name="expand_less"
              color="grey"
              @click="toggleNewsHeight"
              v-show="!arrow"
            ></q-icon>
          </div>
        </div>

        <div class="content">
          <q-card-section>
            <div class="header row q-gutter-md items-center">
              <div class="text-h6 col">{{ select.title }}</div>
              <q-icon
                size="md"
                name="close"
                color="grey"
                v-show="!arrow"
                @click="toggleNewsVisibility"
              />
            </div>
            <div class="box flex q-gutter-sm">
              <div class="text-subtitle2">{{ select.publish_time }}</div>
              <span>|</span>
              <div class="text-subtitle2">{{ select.author }}</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p v-html="select.content"></p>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { defineComponent, ref, onMounted, reactive } from 'vue'
import news from '../assets/data/news_cjn_export.json'
import getMarker from '../composables/marker'

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2l2aXRhc3YiLCJhIjoiY2s3YXBvdDU1MTZpdDNlcDVhb3FrbjdtaiJ9.kLk_w4wIjIQ6dunGULViqw'

export default defineComponent({
  name: 'PageIndex',

  setup () {
    let map = null
    const initMap = () => {
      map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: [114.307212, 30.582736], // starting position [lng, lat]
        zoom: 9 // starting zoom
      })
      showNews()
    }
    const markers = reactive({ data: [] })
    const select = reactive({
      image: '',
      title: '',
      publish_time: '',
      content: '',
      author: ''
    })
    const show = ref(true)

    const showNews = () => {
      news.forEach((item) => {
        if (item.location_ner.length > 0) {
          const location = item.location_ner[0]
          const locationGeo = item.locations
          if (locationGeo[location]) {
            const lnglat = [
              locationGeo[location].longitude,
              locationGeo[location].latitude
            ]
            markers.data.push(
              new mapboxgl.Marker(
                getMarker(24, 32, () => {
                  console.log(item)
                  if (item.images.length > 0) {
                    select.image = item.images[0]
                  } else {
                    select.image = '../../icons/default.jpg'
                  }
                  select.title = item.title
                  select.publish_time = item.publish_time
                  select.content = item.body_html
                  select.author = item.author
                  show.value = true
                })
              )
                .setLngLat(lnglat)
                .addTo(map)
            )
          }
        }
      })
    }

    onMounted(initMap)

    const arrow = ref(false)

    const toggleNewsHeight = () => {
      arrow.value = !arrow.value
    }
    const toggleNewsVisibility = () => {
      show.value = false
    }
    return {
      initMap,
      select,
      show,
      arrow,
      toggleNewsHeight,
      toggleNewsVisibility
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .news {
    max-height: 200px;
    width: 100%;
    position: absolute;
    bottom: 0;
    overflow: auto;
    border-radius: 20px 20px 0 0;
    z-index: 999;
    .select {
      max-height: 100%;
      .image {
        width: 100%;
      }
      .card-arrow {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
      }
    }
  }

  .toggle-news {
    max-height: 100%;
      border-radius: 0;
  }
}
</style>
