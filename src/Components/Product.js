import {useEffect, useState } from "react"
import {useHistory, useLocation} from 'react-router-dom'

const Product = ({products, user, comments}) => {
    const [product, setProduct] = useState(productLoad)
    const history = useHistory()
    const location = useLocation()
    const itemId = parseInt(location.pathname.split("/item/")[1])

    const handleClick = (id) => {
        if (user){
            history.push(`/comment/${id}`)
        } else {
            alert ("Please log in to leave a review")
        }
    }

    useEffect(() => {
        let item = products.find(obj => obj.id === itemId)
        setProduct(item)
    }, [products])

    deleteComment = (id) => {
        fetch(`http://localhost:3000/api/v1/comments/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }
    
    return (
        product ?
        <div>
            <h1>{product.name}</h1>
            <img className="product-image" src= {product.image} alt={product.name}/>
            <h4>$ {product.price}</h4>
            <h6>Product Details: {product.description}</h6>
            
            {comments ? 
            (comments.find(c => c.user_id === user.id && c.product_id === itemId) ?
            <button onClick={() => history.push(`/comment/${product.id}`)}>Edit Review</button>:
            <button onClick={() => handleClick(product.id)}>Leave a Review</button>) : null
            }
        </div> 
        : <h1>This page does not exist</h1>   
    )
}


export default Product

const productLoad = {
    name: "...is loading",
    image: "...is loading",
    price: "...is loading",
    description: "...is loading"
}