import instance from "./instance"

export const List = (key: String) => {
    return instance.get(`/products/${key}`)
}

export const Read = (id: Number) => {
    return instance.get(`/products/${id}`)
}

export const getCate = () => {
    return instance.get('/categories')
}

export const Add = (data: any) => {
    return instance.post('/products', data)
}

export const Remove = (id: Number) => {
    return instance.delete(`/products/${id}`)
}

export const Update = (id: Number, data: any) => {
    return instance.put(`/products/${id}`, data)
}