import Rating from "./Rating";
import {Link} from  'react-router-dom';

function Product(props) {
    const { product } = props;

    return (<>
        <div key={product._id} className="card">
            <Link to= {`/product/${product._id}`}>
                <img className="medium"
                    src={product.image}
                    alt={product.name}
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating key={product._id} rating={product.rating} numReviews={product.numReviews}></Rating>
                <div className="price">₹{product.price}</div>
            </div>
        </div>
         {/* /* <!--***end of card-body and card div**--> */ }

   </> );
}
export default Product;