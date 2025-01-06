import { featureCollection } from '@turf/turf'
/**
 * 添加 earth quake source
 * @param sourceName
 * @param data
 */
export function addEarthQuakeSource(sourceName: string, data: any) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source) {
    source.setData(data)
  }
  else {
    map.addSource(sourceName, {
      type: 'geojson',
      data,
      // cluster: true,
      // clusterMaxZoom: 12,
      // clusterRadius: 25,
    })
  }
}

export function clearEarthQuakeSource(sourceName: string) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source)
    source.setData(featureCollection([]))
}
