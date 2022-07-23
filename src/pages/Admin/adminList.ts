import { getCate, List, Read, Remove } from "../../api/product"
import adminHeader from "../../components/Header/admin"
import adminSidebar from "../../components/Header/sidebar"
import Product from "../../models/product"
import rerender from "../../ultilities/reRender"

const adminList = {
    render: async () => {

        const dataCate = await getCate()
        const categories: any[] = dataCate.data

        let dataProd: any = {}
        const cateKey: any = new URLSearchParams(location.search)
        console.log(cateKey.get("q"));

        const searchKey: any = new URLSearchParams(location.search)
        if (cateKey.get("q")) {
            dataProd = await List(`?category=${cateKey.get("q")}`)
        } else if (searchKey.get('q')) {
            dataProd = await List(`?q=${searchKey.get("key")}`)
        } else {
            dataProd = await List('')
        }

        const products: Product[] = dataProd.data


        return `
            <header>
                ${adminHeader.render()}
            </header>
            <div class="grid grid-cols-8">
                <div class="col-span-1">${adminSidebar.render()}</div>
                <div class="col-span-7 text-[#5F5E61] px-6 bg-[#FBFBFB]" >
                    <div class="flex items-center justify-between mt-2">
                        <h2 class="font-bold text-[23px]">Điện thoại</h2>
                        <a class="mr-[30px]" href="/add-product">
                            <img src="./src/public/image/Add.png">
                        </a>
                    </div>
                    <div>
                        <div class="flex items-center text-[16px] space-x-3">
                            <div>
                                <h3 class="font-bold">Bộ lọc:</h3>
                            </div>
                            <div class="space-y-2">
                                <h3>Danh mục sản phẩm</h3>
                                <select class="border rounded w-[352px] h-[36px]" id="category">
                                    ${categories.map(item => `<option>${item.name}</option>`).join('')}
                                </select>
                            </div>
                        </div>

                        <div class="pt-[14px]">
                            <table class="w-full text-center">
                                <tr class="border-b">
                                    <th class="p-3">#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thành tiền</th>
                                    <th>Hình ảnh</th>
                                    <th>Mô tả</th>
                                    <th>Thao tác</th>
                                </tr>
                                ${products.map(item => `
                                    <tr class="border-b">
                                        <td class="p-3">${item.id}</td>
                                        <td class="text-[14px]">${item.name}</td>
                                        <td class="text-[14px]">${item.salePrice?.toLocaleString('vi', { style: "currency", currency: "VND" })}</td>
                                        <td><img class=" w-[100px] h-[100px] py-2" src="${item.image}"></td>
                                        <td class="text-[13px] w-[390px] py-2">${item.desc}</td>
                                        <td class="flex justify-center items-center space-x-2">
                                            <div>
                                                <a href="/edit/${item.id}">
                                                    <img src="./src/public/image/edit.png"
                                                </a>
                                            </div>
                                            <div>
                                                <button data-id="${item.id}" id="btnRemove">
                                                    <img src="./src/public/image/remove.png"
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    afterRender: () => {
        const category: any = document.querySelector('#category')
        const btnRemove: any = document.querySelectorAll('#btnRemove')
        // console.log(category.value);
        category?.addEventListener('change', () => {
            history.replaceState(null, null, `/category?q=${category.value}`)
            console.log(category.value);

            rerender(adminList)
        })

        btnRemove.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault()
                const confirm = window.confirm('Xác nhận xóa sản phẩm?')
                const id = btn.dataset.id
                if (confirm) {
                    const remove = await Remove(id)
                    if (remove) {
                        rerender(adminList)
                    }
                }

            })
        });

        const searchValue: any = document.querySelector('#search')
        const btnSearch = document.querySelector('#btnSearch')
        btnSearch?.addEventListener('click', () => {
            console.log(searchValue.value);
            history.replaceState(null, null, `/search?key=${searchValue.value}`)
            rerender(adminList)
        })

    }
}

export default adminList