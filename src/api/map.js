import { api } from 'boot/axios'

const map = {
  loadData () {
    return api.get('data')
  }
}

export default map
