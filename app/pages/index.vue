<script setup lang="ts">
import type { FeatureCollection } from 'geojson'
import { featureCollection } from '@turf/turf'
import { vElementSize } from '@vueuse/components'
import axios from 'axios'
import maplibregl from 'maplibre-gl'
import { appName } from '~/constants'
import 'maplibre-gl/dist/maplibre-gl.css'

const showSidebar = ref(true)
const showSelectBaseLayerBox = ref(false)

const baseLayerIndex = ref(0)

const MapContainerRef = useTemplateRef('MapContainerRef')
const AboutModalRef = useTemplateRef('AboutModalRef')

const debouncedFnMapResize = useDebounceFn(() => {
  window.map.resize()
}, 100, { maxWait: 500 })
// methods
function openAbout() {
  AboutModalRef.value?.open()
}

function closeTrigger() {
  showSelectBaseLayerBox.value = false
}
function selectBaseLayer(index: number) {
  const map = window.map
  const previousBaseLayer = BASE_LAYERS[baseLayerIndex.value]
  map.setLayoutProperty(`${previousBaseLayer}-layer`, 'visibility', 'none')
  baseLayerIndex.value = index

  const newBaseLayer = BASE_LAYERS[index]
  map.setLayoutProperty(`${newBaseLayer}-layer`, 'visibility', 'visible')
}
function onResize() {
  debouncedFnMapResize()
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

// onFilterFormSubmit
async function onFilterFormSubmit(value: any) {
  const { data } = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query.geojson', {
    params: value,
  })
  const earthquakeData = (data as FeatureCollection).features.map((item) => {
    // mag > 6 color is #C24740
    // 6 > mag color is #F3AE1A
    console.log(item.properties!.mag)
    item.properties!.color
      = item.properties!.mag > 6 ? '#C24740' : '#F3AE1A'
    return item
  })
  addEarthQuakeSource(EARTH_QUAKE_SOURCE_NAME, featureCollection(earthquakeData))
  addEarthQuakeLayer()
}

onMounted(() => {
  const map = new maplibregl.Map({
    container: MapContainerRef.value!,
    style: MAP_STYLE,
    center: MAP_INIT_CENTER,
    zoom: MAP_INIT_ZOOM,
    hash: true,
  })
  window.map = map

  const navControl = new maplibregl.NavigationControl()
  map.addControl(navControl, 'bottom-left')

  map.on('load', () => {
    // map.resize()
    // mapStoreLoaded.value = true
    // mapLoadImages()
    addColorPoint()
  })
})

onUnmounted(() => {
  // mapStoreLoaded.value = false
})
</script>

<template>
  <main class="h-screen w-screen flex flex-col">
    <div class="h-60px w-full flex items-center justify-between px-16px py-8px text-18px text-dark-5 shadow">
      <div class="flex items-center gap-2">
        <img src="/logo.svg" class="h-32px w-32px">
        <div class="font-bold">
          {{ appName }}
        </div>
      </div>
      <AboutModal ref="AboutModalRef" />
      <div class="cursor-pointer rounded p-1 text-dark-5 hover:bg-gray-1" @click="openAbout()">
        <div class="i-carbon-help" />
      </div>
    </div>
    <div class="h-40px w-full flex items-center bg-gray-1 px-16px">
      <div class="flex items-center gap-2 px-2 py-1 hover:(cursor-pointer bg-gray-2)" :class="showSidebar ? 'text-primary font-bold' : 'text-dark-5'" @click="toggleSidebar()">
        <div class="i-carbon-layers" />
        <div>图层</div>
      </div>
      <ADivider direction="vertical" />
      <ATrigger v-model:popup-visible="showSelectBaseLayerBox" trigger="click" :unmount-on-close="false" position="bl">
        <div class="flex items-center gap-2 px-2 py-1 text-dark-5 hover:(cursor-pointer bg-gray-2)">
          <div class="i-carbon-apps" />
          <div>底图</div>
        </div>
        <template #content>
          <div class="w-200px rounded bg-white shadow">
            <div class="flex items-center justify-between px-16px py-12px">
              <div>选择底图</div>
              <div class="cursor-pointer rounded p-1 hover:bg-gray-2">
                <div class="i-carbon-close" @click="closeTrigger()" />
              </div>
            </div>
            <div class="h-1px w-full bg-gray-1" />
            <div class="grid grid-cols-2 gap-1 p-12px">
              <div v-for="(item, index) in baseLayerList" :key="item.id" class="flex flex-col items-center gap-1 rounded py-2" :class="baseLayerIndex === index ? 'text-primary font-bold border border-blue' : 'cursor-pointer'" @click="selectBaseLayer(index)">
                <img :class="baseLayerIndex === index ? 'shadow shadow-blue' : ''" class="h-36px w-64px" :src="item.img">
                <div :class="baseLayerIndex === index ? 'text-shadow shadow-blue' : ''">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </ATrigger>
    </div>
    <div class="flex-y-hidden flex">
      <div v-if="showSidebar" class="relative w-250px flex flex-none flex-col px-18px py-18px shadow">
        <div>筛选数据</div>
        <div class="h-12px w-full" />
        <FilterForm @submit="onFilterFormSubmit" />
        <div class="text-gray-5">
          请选择需要展示的图层
        </div>
        <div class="h-12px w-full" />
      </div>
      <div class="flex-1">
        <div ref="MapContainerRef" v-element-size="onResize" class="flex-x-hidden relative h-full w-full overflow-hidden" />
      </div>
    </div>
  </main>
</template>
