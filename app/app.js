function alien () {
  let target = document.querySelector('.response')

  let ayy = new Request('/api/ayy')

  fetch(ayy)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status)
      }
      return response.json()
    })
    .then((response) => {
      let lmao = response.response

      target.textContent = lmao
    })
}

document.addEventListener('DOMContentLoaded', alien)
