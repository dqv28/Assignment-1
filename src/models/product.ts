class Product {
    name: string;
    originalPrice: number;
    image: string;
    salePrice?: number;
    category?: string;
    feature?: string;
    desc?: string;
    shortDescription?: string;
    constructor(
        name: string,
        originalPrice: number,
        image: string,
        category?: string,
        feature?: string,
        desc?: string,
        salePrice?: number,
        shortDescription?: string
    ) {
        this.name = name;
        this.originalPrice = originalPrice;
        this.image = image;
        this.salePrice = salePrice;
        this.category = category;
        this.feature = feature;
        this.desc = desc;
        this.shortDescription = shortDescription;
    }
}

export default Product