import Product from "../Models/Product.js"
import CreateError from "http-errors"
import SLA_specs from "../Models/SLA_specs.js"
import FDM_specs from "../Models/FDM_specs.js"
import Scanner_specs from "../Models/Scanner_specs.js"
import LeaserCutter_specs from "../Models/leaserCutter.js"
import { Op, fn, col, where } from "sequelize"
import ProductVariant from "../Models/ProductVarient.js"
import purchaseLinks from "../Models/purchaseLinks.js"
import ProductImages from "../Models/productImages.js"
import Sequelize from "sequelize"
import Review from "../Models/Review.js"



export const allproduct = async () => {
    return await Product.findAndCountAll()
}


export const findProductsbyType = async (type) => {
    return await Product.findAll({
        where: { productType: type },
        attributes: ['Id', 'product_name', 'manufacturer', 'discription', 'price', 'include_in_BestDeals', 'overall_rating'],
        include: {
            model: ProductImages,
            where: {
                role: 1
            },
            attributes: ['path']

        },
        order: [['createdAt', 'DESC']]
    })
}


export const insertProduct = async (data) => {
    const instance = await Product.create(data)
    if (data.variants) {
        const variants = await instance.addVariant(data.variants)
        variants.map(async (variant) => {
            const tempProduct = await Product.findByPk(variant.dataValues.variantId)
            tempProduct.addVariant(instance.Id)
        })
    }
    await ProductImages.create({ path: data.thumbnail[0], role: 1, ProductId: instance.Id })
    if (data.images) {
        data.images.forEach(async (image) => {
            await ProductImages.create({ path: image, role: 2, ProductId: instance.Id })
        });
    }
    if (data.sdImages) {
        data.sdImages.forEach(async (image) => {
            await ProductImages.create({ path: image, role: 3, ProductId: instance.Id })
        })

    }

    return instance.Id
}


export const InsertSLA_Specs = async (data) => {
    const instance = await SLA_specs.create(data)
    return instance
}


export const InsertFDM_Specs = async (data) => {
    const instance = await FDM_specs.create(data)
    return instance
}


export const InsertScanner_Specs = async (data) => {
    const instance = await Scanner_specs.create(data)
    return instance
}


export const InsertLeaserCutter_Specs = async (data) => {
    const instance = await LeaserCutter_specs.create(data)
    return instance
}

export const updateSLA_Specs = async (specsId, data) => {
    const instance = await SLA_specs.update(data, {
        where: {
            id: specsId
        }
    })
    console.log(instance)
    return instance
}


export const updateFDM_Specs = async (specsId, data) => {
    console.log(data)
    const instance = await FDM_specs.update(data, {
        where: {
            id: specsId
        }
    })
    return instance
}


export const updateScanner_Specs = async (specsId, data) => {
    const instance = await Scanner_specs.update(data, {
        where: {
            id: specsId
        }
    })
    return instance
}


export const updateLeaserCutter_Specs = async (specsId, data) => {
    console.log(data)
    const instance = await LeaserCutter_specs.update(data, {
        where: {
            id: specsId
        }
    })
    return instance
}


export const findProductById = async (id) => {
    const instance = await Product.findByPk(id, {
        include: {
            model: ProductImages,
            attributes: ['path', 'role']

        }
    })
    return instance
}


export const getScannerSpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: Scanner_specs })
        return instance.scanner


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}


export const getFDMSpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: FDM_specs })
        return instance.FDM


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}


export const getSLASpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: SLA_specs })
        return instance.SLA


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}


export const getLeaserCutterSpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: LeaserCutter_specs })
        return instance.LeaserCutter


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}




export const SearchInProduct = async (SearchQuery) => {
    try {
        console.log("search " + SearchQuery)
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.iLike]: `%${SearchQuery}%`
                        }
                    },
                    {
                        manufacturer: {
                            [Op.iLike]: `%${SearchQuery}%`
                        }
                    }
                ]
            },
            attributes: ['Id', 'product_name', 'overall_rating', 'discription', "productType"],
            include: {
                model: ProductImages,
                where: {
                    role: 1
                },
                attributes: ['path']
            }
        })
        console.log(products)
        return products
    } catch (error) {
        console.log(`From Product Services SearchInProducts ${error}`)
        return error
    }
}


export const SearchInProductByType = async (SearchQuery, type) => {
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.iLike]: `%${SearchQuery}%`
                        }
                    },
                    {
                        manufacturer: {
                            [Op.iLike]: `%${SearchQuery}%`
                        }
                    }
                ],
                productType: type
            },
            attributes: ['Id', 'product_name', 'overall_rating', 'discription'],
            include: {
                model: ProductImages,
                where: {
                    role: 1
                },
                attributes: ['path']

            }
        })
        return products
    } catch (error) {
        console.log(`From Product Services SearchInProducts ${error}`)
        return error
    }
}


export const testFunction = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: Scanner_specs })
        return instance.scanner


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}


export const productDetail = async (id) => {
    const instance = await Product.findByPk(id,
        {
            include:
                [SLA_specs,
                    FDM_specs,
                    Scanner_specs,
                    LeaserCutter_specs,
                    purchaseLinks,
                    {
                        model: ProductImages,
                        order: [['role', 'ASC']],
                    },
                    {
                        'association': 'variants',
                        attributes: ['Id', 'product_name'],
                        include: [SLA_specs, FDM_specs, Scanner_specs, LeaserCutter_specs]
                    }
                ]
        })

    return instance
}

export const updateProduct = async (id, data) => {
    const overall_rating = Math.round((data.price_rating + data.innovation_rating + data.software_rating + data.customer_service_rating + data.processing_rating) / 5)
    data['overall_rating'] = overall_rating
    console.log(data)
    const result = await Product.update(data,
        {
            where: {
                Id: id
            }
        })

    return result
}


export const updatePurchaseLink = async (productId, purchaseId, data) => {
    const result = await purchaseLinks.update(data, {
        where: {
            product: productId,
            purchaseLinksId: purchaseId
        }
    })
    return result

}


export const insertVariant = async (productId, variantsList) => {
    const instance = await Product.findByPk(productId)
    if (variantsList) {
        const variants = await instance.addVariant(variantsList)
        console.log(variants)
        variants.map(async (variant) => {
            const tempProduct = await Product.findByPk(variant.dataValues.variantId)
            tempProduct.addVariant(instance.Id)
        })
    }
    return true
}


export const removeProduct = async (productId) => {
    return await Product.destroy({
        where: {
            Id: productId
        }
    })
}


export const removeVariant = async (product, variant) => {
    return await ProductVariant.destroy({
        where:
        {
            [Op.or]: [
                {
                    productId: product,
                    variantId: variant

                },
                {
                    productId: variant,
                    variantId: product

                },

            ]

        }

    })
}


export const manufacturerList = async (type) => {
    let manufacturer = []
    if (type != 0) {
        manufacturer = await Product.findAll({
            where: {
                productType: type
            },
            attributes: [fn('DISTINCT', col('manufacturer')), 'manufacturer']
        })
    }
    else {
        manufacturer = await Product.findAll({
            attributes: [fn('DISTINCT', col('manufacturer')), 'manufacturer']
        })
    }
    return manufacturer
}

export const productList = async (manufacturers) => {
    let products = []
    if (manufacturers.length > 0) {

        products = await Product.findAll({
            where: {
                manufacturer: {
                    [Op.in]: manufacturers
                }
            },
            attributes: ['Id', 'product_name'],

        })
    }
    else {
        products = await Product.findAll({
            attributes: ['Id', 'product_name'],

        })
    }
    return products
}

export const productFilter = async (data) => {
    console.log(data)
    let products = []
    let whereClause = {}
    if (data.manufacturers && data.manufacturers.length > 0) {
        whereClause['manufacturer'] = {

            [Op.in]: data.manufacturers
        }
    }
    if (data.products && data.products.length > 0) {
        whereClause['Id'] = {
            [Op.in]: data.products
        }
    }
    if (data.price) {
        whereClause['price'] = {
            [Op.lt]: data.price
        }
    }
    if (data.productType){
        whereClause['productType']=data.productType
    }

    products = await Product.findAll({
        where: whereClause,
        attributes: ['Id', 'product_name', 'manufacturer', 'discription', 'price', 'include_in_BestDeals', 'overall_rating','productType'],
        include: [
            SLA_specs,
            FDM_specs,
            Scanner_specs,
            LeaserCutter_specs,
            purchaseLinks,
            {
            model: ProductImages,
            where: {
                role: 1
            },
            attributes: ['path']
        }]
    })
    return products
}

export const findPurchaseLinks = async (id) => {
    const result = await purchaseLinks.findAll({
        where: {
            "product": id
        },
        attributes: ["purchaseLinksId", "siteType", "link", "title", "coupon", "discription", "retrivePriceFlag","visitingLink"]
    })
    return result
}

export const getPurchaseLinkPrice = async (id) => {
    const result = await purchaseLinks.findByPk(id,
        {
            attributes: ["discountedPrice", "originalPrice", "unit", "updatedAt", "siteType", "link", "retrivePriceFlag", "purchaseLinksId"]
        })
    return result

}

export const setNewPriceForPurchaseLink = async (id, data) => {
    const result = await purchaseLinks.update(data, {
        where: {
            purchaseLinksId: id
        }
    })
    return result
}

export const addPurchaseLink = async (data) => {
    const purchaseLinksId = data.purchaseLink.purchaseLinkId

    const link = data.purchaseLink
    const id = data.productId
    let result
    if (purchaseLinksId) {
        const hasLink = await purchaseLinks.findByPk(purchaseLinksId)
        if (hasLink) {
            result = await purchaseLinks.update({ ...link }, {
                where: {
                    purchaseLinksId: purchaseLinksId
                }
            })
        }
        else {
            throw Error("PurchaseLink is not Found")
        }
    }
    else {
        const product = await Product.findByPk(id)
        if (product) {
            console.log(link)
            result = await purchaseLinks.create({ ...link, "product": product.Id })

        }
        else {
            throw Error("Product is not Found")
        }
    }
    return result
}


export const deletePurchaseLink = async (id) => {
    await purchaseLinks.destroy({
        where: {
            purchaseLinksId: id

        }
    })
}

export const getProductImageById = async (id) => {
    const Image = await ProductImages.findByPk(id)
    return Image
}

export const deleteProductImage = async (imageId) => {
    const result = await ProductImages.destroy({
        where: {
            id: imageId
        }
    })
    return result
}
export const updateProductImage = async (imageId, fields) => {
    const [updateRowCount, updatedFields] = await ProductImages.update(fields, {
        where: {
            id: imageId
        },
        returning: true
    })
    return updatedFields
}

export const findThumbnail = async (productId) => {
    const result = await ProductImages.findAll({
        where: {
            ProductId: productId,
            role: 1
        }
    })
    return result
}

export const insertImages = async (productId, images, imageRole) => {
    const result = images.map(async (image) => {
        await ProductImages.create({ path: image, role: imageRole, ProductId: productId })
    });
    console.log(result)
    return true
}

export const CreateReview = async (productId, data) => {
    const result = await Review.create({ ...data, product: productId })
    return result
}

export const findReview = async (productId) => {
    const result = await Review.findAll({
        where: {
            product: productId
        }
    })
    return result
}

export const changeReviews = async (productId, data) => {
    const result = await Review.update(data, {
        where: {
            product: productId
        }
    })
    return result
}
