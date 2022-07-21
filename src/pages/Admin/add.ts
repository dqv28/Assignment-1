import { upload } from "../../api/image"
import { Add, getCate } from "../../api/product"
import adminHeader from "../../components/Header/admin"
import adminSidebar from "../../components/Header/sidebar"
import Product from "../../models/product"

const adminAdd = {
    render: async () => {
        const dataCate = await getCate()
        const categories: any[] = dataCate.data
        return `
            <header>
                ${adminHeader.render()}
            </header>
            <div class="grid grid-cols-8">
                <div class="col-span-2">${adminSidebar.render()}</div>
                <div class="col-span-6 text-[#5F5E61] px-6">
                    <h2 class="font-bold text-[23px] mt-4">Thêm sản phẩm mới</h2>
                    <form id="form-add" class="grid grid-cols-5">
                        <div class="col-span-2 mx-6">
                            <div class="h-[250px] grid content-center mt-10">
                                <div class="grid justify-items-center">
                                    <img id="edit-image" class="w-[200px] h-[200px] mb-2">
                                    <input type="file" id="edit-file" accept="image/png, image/jpg, image/jpeg" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="border-b pb-3 mb-3">
                                <h3 class="text-[19px]">Thông tin sản phẩm</h3>
                            </div>
                            
                            <div>
                                <div class="mb-3">
                                    <lable>Tên sản phẩm</lable>
                                    <input type="text" class="border block w-full rounded py-1 pl-2" id="name-product" required>
                                </div>
                                <div class="w-full grid grid-cols-2 gap-2 mb-3">
                                    <div>
                                        <lable>Giá gốc</lable>
                                        <input type="number" class="border block w-full rounded py-1 pl-2" id="original-price" required>
                                    </div>
                                    <div>
                                        <lable>Giá khuyến mãi</lable>
                                        <input type="number" class="border block w-full rounded py-1 pl-2" id="sale-price" required>
                                    </div>
                                </div>
                                <div class="mb-3 w-full grid grid-cols-2">
                                    <div class="col-span-1">
                                        <lable>Danh mục</lable>
                                        <select class="border block w-full rounded py-1 pl-2" id="category">
                                            ${categories.map(item => `
                                                <option>${item.name}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label>Mô tả dài</label>
                                    <textarea class="block border w-full" cols="30" rows="5" id="desc" required></textarea>
                                </div>
                                <button class="bg-[#00B0D7] border border-[#007BFF] rounded text-white py-2 px-4" id="btn-add">Thêm mới</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        `
    },
    afterRender: () => {
        const formAdd = document.querySelector('#form-add')
        const editFile = document.querySelector('#edit-file')
        const editImage: any = document.querySelector('#edit-image')

        formAdd?.addEventListener('submit', (e) => {
            e.preventDefault()
            const name: any = document.querySelector('#name-product')
            const ogPrice: any = document.querySelector('#original-price')
            const salePrice: any = document.querySelector('#sale-price')
            const category: any = document.querySelector('#category')
            const desc: any = document.querySelector('#desc')
            const img: any = editImage.src
            // console.log(desc.value);
            const product: Product = {
                name: name.value,
                originalPrice: parseInt(ogPrice.value),
                salePrice: parseInt(salePrice.value),
                image: img,
                desc: desc.value,
                category: category.value,

            }

            const addProd: any = Add(product)
            if (addProd) {
                alert("Thêm thành công")
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
                return editImage.src = data.url
                // console.log(data);

            }

        })
    }
}

export default adminAdd