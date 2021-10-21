import { api } from 'boot/axios'

const news = {
  loadData () {
    return api.get('data')
  }
}

export default news
