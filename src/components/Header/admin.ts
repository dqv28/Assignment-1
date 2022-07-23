

const adminHeader = {
    render: () => {
        return `
            <div class="bg-[#00B0D7] flex items-center text-white">
                <div class="flex items-center p-2 space-x-2 mr-[67px] ml-8">
                    <a href="/"><img class="w-[65px] h-[57px]" src="../src/public/image/logo.png"></a>
                    <h4>Dashboard</h4>
                </div>
                <div class="mr-[444px]">
                    <div class="flex items-center h-[34px]">
                        <button class="bg-white h-full grid place-items-center pl-2 rounded-l-[10px]" id="btnSearch">
                            <img class="" src="../src/public/image/search.png">
                        </button>
                        <input class="h-full rounded-r-[10px] w-[450px] pl-2" id="search" type="text" value="">
                    </div>
                </div>
                <div>
                    <h2 class="">Xin chào Vuong</h2>
                </div>
            </div>
        `
    }
}

export default adminHeader