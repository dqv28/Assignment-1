import { getCate, List } from "../../api/product"
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
        if (cateKey.get("q")) {
            dataProd = await List(`?category=${cateKey.get("q")}`)
        } else if (cateKey.get("q") && cateKey.get("q") == "Tất cả") {
            dataProd = await List('')
        } else {
            dataProd = await List('')
        }

        const products: Product[] = dataProd.data


        return `
            <header>
                ${adminHeader.render()}
            </header>
            <div class="grid grid-cols-8">
                <div class="col-span-2">${adminSidebar.render()}</div>
                <div class="col-span-6 text-[#5F5E61] px-6">
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
                                    <th>Ẩn/Hiện</th>
                                    <th>Thao tác</th>
                                </tr>
                                ${products.map(item => `
                                    <tr class="border-b">
                                        <td class="p-3">${item.id}</td>
                                        <td class="text-[14px]">${item.name}</td>
                                        <td class="text-[14px]">${item.salePrice?.toLocaleString('vi', { style: "currency", currency: "VND" })}</td>
                                        <td><img class="w-[100px] h-[100px] py-2" src="${item.image}"></td>
                                        <td class="text-[13px] w-[350px] py-2">${item.desc}</td>
                                        <td class="">
                                            <a href="" class="flex justify-center">
                                                <img src="./src/public/image/hidden.png"
                                            </a>
                                        </td>
                                        <td>
                                            <a href="/edit/${item.id}" class="flex justify-center">
                                                <img src="./src/public/image/edit.png"
                                            </a>
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
        // console.log(category.value);
        category?.addEventListener('change', () => {
            history.replaceState(null, null, `/category?q=${category.value}`)
            console.log(category.value);

            rerender(adminList)
            // if (render) {
            //     const cateKey: any = new URLSearchParams(location.search)
            //     if (cateKey.get('q')) {
            //         category.value == cateKey.get('q')
            //     }
            // }
        })

    }
}

export default adminList