import type { LayerSpecification, LngLatLike, StyleSpecification } from 'maplibre-gl'

export const MAP_INIT_CENTER: LngLatLike = [108.84, 31.06]
export const MAP_INIT_ZOOM = 4
export const baseLayerList = [
  {
    name: '影像图',
    img: '/World_Imagery.png',
    id: 'esri-World_Imagery',
  },
  {
    name: '地形图',
    img: '/World_Hillshade.png',
    id: 'esri-World_Hillshade',
  },
  {
    name: '海洋图',
    img: '/World_Ocean_Base.png',
    id: 'esri-World_Ocean_Base',
  },
  {
    name: '国家地理',
    img: '/NatGeoStyleBase.png',
    id: 'esri-NatGeoStyleBase',
  },
  {
    name: '萤火影像',
    img: '/World_Imagery_Firefly.png',
    id: 'esri-World_Imagery_Firefly',
  },
]
// 2 底图
export const BASE_LAYERS = baseLayerList.map(item => item.id)
export const COMPUTED_BASE_LAYERS: LayerSpecification[] = BASE_LAYERS.map((item, index) => {
  return {
    id: `${item}-layer`,
    type: 'raster',
    source: item,
    layout: { visibility: index === 0 ? 'visible' : 'none' },
  }
})
export const MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'Basic',
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    'pb2002-boundaries': {
      type: 'geojson',
      data: '/PB2002_boundaries.json', // GeoJSON 文件的 URL
    },
    'esri-World_Imagery': {
      type: 'raster',
      tiles: [
        `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,
      ],
      tileSize: 256,
    },
    'esri-World_Hillshade': {
      type: 'raster',
      tiles: [
        `https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}`,
      ],
      tileSize: 256,
    },
    'esri-World_Ocean_Base': {
      type: 'raster',
      tiles: [
        `https://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}`,
      ],
      tileSize: 256,
    },
    'esri-NatGeoStyleBase': {
      type: 'raster',
      tiles: [
        `https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/NatGeoStyleBase/MapServer/tile/{z}/{y}/{x}`,
      ],
      tileSize: 256,
    },
    'esri-World_Imagery_Firefly': {
      type: 'raster',
      tiles: [
        `https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}`,
      ],
      tileSize: 256,
    },
  },
  layers: [
    ...COMPUTED_BASE_LAYERS,
    {
      id: 'pb2002-boundaries-layer',
      type: 'line',
      source: 'pb2002-boundaries',
      paint: {
        'line-color': '#FF0000',
        'line-width': 2,
      },
    },
  ],
}

export const EARTH_QUAKE_SOURCE_NAME = 'earth_quake_source'
export const EARTH_QUAKE_LAYER_NAME = 'earth_quake_layer'
export const EARTH_QUAKE_CLUSTER_LAYER_NAME = 'earth_quake_cluster_layer'
export const EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME = 'earth_quake_cluster_count_layer'
