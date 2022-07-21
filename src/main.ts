import './style.css'
import Navigo from 'navigo'
import adminList from './pages/Admin/adminList'
import adminAdd from './pages/Admin/add'
import adminUpdate from './pages/Admin/update'

const router = new Navigo('/', { linksSelector: "a" })
const app: any = document.querySelector<HTMLDivElement>('#app')

export interface componentBase {
  render: () => any,
  afterRender: () => any
}

document.addEventListener('DOMContentLoaded', () => {
  async function print(component: componentBase, id?: Number) {
    app.innerHTML = await component.render(id)
    if (component.afterRender) {
      await component.afterRender(id)
    }
  }

  router.on({
    '/': () => {
      print(adminList)
    },
    '/add-product': () => {
      print(adminAdd)
    },
    '/edit/:id': (param: Number) => {
      const id = +param.data.id
      print(adminUpdate, id)
    }
  })

  router.resolve()
})


