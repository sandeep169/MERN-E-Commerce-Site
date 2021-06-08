import Rating from "./Rating";
import {Link} from  'react-router-dom';

function Product(props) {
    const { product } = props;

    return (<>

        <div key={product._id} className="card">
            {/* <Link to= {`/product/${product._id}`}>
                <img className="medium"
                    src={product.product_images.product_name}
                    alt={product.name}
                />
            </Link> */}
            <h1>{product.subSubCategory}</h1>
            <h1>{product.subCategory}</h1>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.brand}</h2>
                    {/* <h2>Category : {product.product_images.product_name}</h2> */}
                    <h2>Category : {product.category}</h2>
                </Link>
                {/* <Rating key={product._id} rating={product.rating} numReviews={product.numReviews}></Rating> */}
                <Rating key={product._id} rating={product.rating}></Rating>
                <div className="price">₹{product.price}</div>
                {/* <h1>Total Stock :{product.stock}</h1> 
                <h1>Sub Category :{product.subCategory}</h1> */}
            </div>
        </div>
         {/* /* <!--***end of card-body and card div**--> */ }

   </> );
}
export default Product;