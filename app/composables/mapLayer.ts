export function addEarthQuakeLayer() {
  const map = window.map
  // if (map.getLayer(EARTH_QUAKE_CLUSTER_LAYER_NAME))
  //   map.removeLayer(EARTH_QUAKE_CLUSTER_LAYER_NAME)
  // map.addLayer({
  //   id: EARTH_QUAKE_CLUSTER_LAYER_NAME,
  //   type: 'circle',
  //   source: EARTH_QUAKE_SOURCE_NAME,
  //   filter: ['has', 'point_count'],
  //   paint: {
  //     'circle-color': '#d3cdc0',
  //     'circle-stroke-color': '#a59a83',
  //     'circle-stroke-width': 1,
  //     'circle-radius': 10,
  //   },
  // })
  // if (map.getLayer(EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME))
  //   map.removeLayer(EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME)
  // map.addLayer({
  //   id: EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME,
  //   type: 'symbol',
  //   source: EARTH_QUAKE_SOURCE_NAME,
  //   filter: ['has', 'point_count'],
  //   layout: {
  //     'text-field': '{point_count_abbreviated}',
  //     'text-size': 12,
  //     'text-allow-overlap': true,
  //   },
  //   paint: {
  //     'text-color': 'white',
  //   },
  // })
  if (map.getLayer(EARTH_QUAKE_LAYER_NAME))
    map.removeLayer(EARTH_QUAKE_LAYER_NAME)
  map.addLayer({
    id: EARTH_QUAKE_LAYER_NAME,
    type: 'symbol',
    source: EARTH_QUAKE_SOURCE_NAME,
    layout: {
      'icon-image': ['get', 'color'],
      'icon-size': 0.3,
      'text-field': ['get', 'place'],
      'text-size': 12,
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'icon-allow-overlap': true,
    },
    paint: {
      'text-color': '#7e6c56',
      'text-halo-color': '#fff',
      'text-halo-width': 1,
      'text-halo-blur': 0,
    },
  })
}
