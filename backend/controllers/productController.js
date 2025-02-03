import { v2 as cloudinary } from 'cloudinary'
import productModel from "../models/productModel.js"


// upload the new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {

                try {
                    let result = await cloudinary.uploader.upload(item.path, {
                        folder: "ClickCart-Images",
                        resource_type: 'image'
                    })

                    return result.secure_url;

                } catch (error) {
                    console.log(`Error: while uploading image:${item} to the cloudinary, `, error);
                    return res.json({
                        success: false,
                        message: error.message
                    })
                }

            })
        )


        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product Added"
        })

    } catch (error) {
        console.log("Error: while adding the product, in the backend(cloudinary and mongoDB), ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Fetch all the products from the database
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log("Error: while getting the product from the mongoDB, ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Remove the product from the database
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)

        res.json({
            success: true,
            message: "Product Removed"
        })

    } catch (error) {
        console.log("Error: while removing the product from the mongoDB, ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Fetch the single product from the database
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await productModel.findById(productId);

        res.json({
            success: true,
            product
        })

    } catch (error) {
        console.log("Error: while fetching the product information from the mongoDB, ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { addProduct, listProduct, removeProduct, singleProduct }