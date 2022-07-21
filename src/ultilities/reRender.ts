import { componentBase } from "../main";

const rerender = async (component: componentBase) => {
    if (component) {
        document.querySelector('#app').innerHTML = await component.render()
    }
    if (component.afterRender) {
        component.afterRender()
    }
}

export default rerender