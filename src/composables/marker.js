export default function getMarker (width, height, onClick) {
  const el = document.createElement('div')
  el.className = 'marker'
  el.style.backgroundImage = 'url(../../icons/icon.png)'
  el.style.backgroundSize = '100%'
  el.style.width = `${width}px`
  el.style.height = `${height}px`

  el.addEventListener('click', onClick)
  return el
}
