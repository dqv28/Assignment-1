import { upload } from "../../api/image"
import { getCate, Read, Update } from "../../api/product"
import adminHeader from "../../components/Header/admin"
import adminSidebar from "../../components/Header/sidebar"

const adminUpdate = {
    render: async (param: Number) => {
        const data = await Read(param)
        const detail: any = data.data
        const dataCate = await getCate()
        const categories: any[] = dataCate.data

        return `
            <header>
                ${adminHeader.render()}
            </header>
            <div class="grid grid-cols-8">
                <div class="col-span-2">${adminSidebar.render()}</div>
                <div class="col-span-6 text-[#5F5E61] px-6">
                    <h2 class="font-bold text-[23px] mt-4">Cập nhật sản phẩm</h2>
                    <div class="grid grid-cols-5">
                        <div class="col-span-2 mx-6">
                            <div class="h-[250px] grid content-center mt-10">
                                <div class="grid justify-items-center">
                                    <img id="image" class="w-[200px] h-[200px] mb-2" src="${detail.image}">
                                    <img id="edit-image" class="w-[200px] h-[200px] mb-2 hidden">
                                    <input type="file" id="edit-file" accept="image/png, image/jpg, image/jpeg" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="border-b pb-3 mb-3">
                                <h3 class="text-[19px]">Thông tin sản phẩm</h3>
                            </div>

                            <form id="form-update">
                                <div class="mb-3">
                                    <lable>Tên sản phẩm</lable>
                                    <input required type="text" class="border block w-full rounded py-1 pl-2" id="name-product" value="${detail.name}">
                                </div>
                                <div class="w-full grid grid-cols-2 gap-2 mb-3">
                                    <div>
                                        <lable>Giá gốc</lable>
                                        <input required type="number" class="border block w-full rounded py-1 pl-2" id="original-price" value="${detail.originalPrice}">
                                    </div>
                                    <div>
                                        <lable>Giá khuyến mãi</lable>
                                        <input required type="number" class="border block w-full rounded py-1 pl-2" id="sale-price" value="${detail.salePrice}">
                                    </div>
                                </div>
                                <div class="mb-3 w-full grid grid-cols-2">
                                    <div class="col-span-1">
                                        <div class="flex items-center space-x-3 mb-2">
                                            <lable>Danh mục</lable>
                                            <select class="border rounded py-1 pl-2" id="category">
                                                ${categories.map(item => `<option>${item.name}</option>`).join('')}
                                            </select>
                                        </div>
                                        <input required disabled type="text" class="w-full border rounded py-1 pl-2" value="${detail.category}">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label>Mô tả dài</label>
                                    <textarea class="block border w-full p-2" cols="30" rows="5" id="desc">${detail.desc}</textarea>
                                </div>
                                <button class="bg-[#00B0D7] border border-[#007BFF] rounded text-white py-2 px-4">Cập nhật</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        `
    },
    afterRender: async (param: Number) => {
        const formUpdate = document.querySelector("#form-update")
        const editFile = document.querySelector('#edit-file')
        const editImage: any = document.querySelector('#image')
        const imageUrl: any = document.querySelector('#edit-image')
        const data = await Read(param)
        const newData: any = data.data

        const name: any = document.querySelector('#name-product')
        const ogPrice: any = document.querySelector('#original-price')
        const salePrice: any = document.querySelector('#sale-price')
        const category: any = document.querySelector('#category')
        const desc: any = document.querySelector('#desc')
        const img: any = editImage.src

        formUpdate?.addEventListener('submit', (e) => {
            e.preventDefault()
            newData.name = name.value
            newData.originalPrice = parseInt(ogPrice.value)
            newData.salePrice = parseInt(salePrice.value)
            newData.category = category.value
            newData.desc = desc.value
            if (imageUrl.src) {
                newData.image = imageUrl.src
            } else {
                newData.image = img
            }


            const updateProd: any = Update(param, newData)
            if (updateProd) {
                alert("Cập nhật thành công")
                location.href = '/'
            }

        })

        editFile?.addEventListener('change', (event: any) => {
            const file = event.target.files[0]
            const reader: any = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = async () => {
                const res = await upload(reader.result)
                const data = res.data
                imageUrl.src = data.url
                editImage.src = data.url
                // console.log(data);

            }

        })
    }
}

export default adminUpdate