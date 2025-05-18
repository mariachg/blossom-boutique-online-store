import React, { useState } from 'react'
import './AddProduct.css'
import uploadImage from '../../assets/upload.png'//<a href="https://www.flaticon.com/free-icons/import" title="import icons">Import icons created by HideMaru - Flaticon</a>

function AddProduct() {
    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "clothes",
        price: ""
    })
    //function for when adding images for a new product
    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }
    //function for when adding the name, category and price of a new product
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
    //function for when Adding the new product
    const addProduct = async()=> {
        console.log(productDetails)
    
        let responseData
        let product = productDetails
        
        let formData = new FormData()
         formData.append('product', image) 

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data})

        //image url success 
        if(responseData.success) {
            product.image = responseData.image_url
            console.log(product)
            //ensure the new product is added successfully into the database
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST', 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data)=>{
                data.success?alert("Product Successfully Added"):alert("Failed")
            })

        }
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Name</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                    <option value="clothes"> Clothes </option>
                    <option value="swimwear"> Swimwear </option>
                    <option value="fragrances"> Fragrances </option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : uploadImage} className='addproduct-imageupload' alt="" /> {/* if image is true then it will display the selected file if it is not true it will display the default uploadImage */}
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => {addProduct()}} className="addproduct-btn">ADD</button>
        </div>
    )
}

export default AddProduct