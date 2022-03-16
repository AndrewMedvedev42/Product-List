interface ProductData {
    name:string,
    imageUrl:string,
    count:number,
    size:{
        width:number,
        height:number
    }
    weight:string,
    comments:object
}

export const checkProductDataType = (event:any) => {
    try {
        const productData:ProductData = {
            name: event.target.name.value,
            imageUrl:"https://dictionary.cambridge.org/ru/images/thumb/box_noun_002_04301.jpg?version=5.0.225",
            count: event.target.count.value,
            size:{
              width: event.target.width.value,
              height: event.target.height.value,
            },
            weight: `${event.target.weight.value}g`,
            comments:[]
        }
        return productData
    } catch (error) {
       return error
    }
}