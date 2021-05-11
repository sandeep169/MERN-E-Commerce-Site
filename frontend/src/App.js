import './App.css';
import data from './data';

function App() {
    return (
        <>
            <div className="grid-container">
                <header className="row">
                    <div>
                        {/* <!-- logo --> */}
                        <a className="brand" href="/">Klieder House</a>
                    </div>
                    <div>
                        {/* <!-- links --> */}
                        <a href="/">Cart</a>
                        <a href="/">Sign Up</a>
                    </div>
                </header>
                {/* <!-- image size 680px by 830 px --> */}
                {/* <!-- body of card ,, product body  --> */}
                <main>
                    <div>
                        <div className="row center">
                            {data.products.map((product) => (
                                <div key={product._id} className="card">
                                    <a href={`/product/${product._id}`}>
                                        <img className="medium"
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </a>
                                    <div className="card-body">
                                        <a href={`/product/${product._id}`}>
                                            <h2>{product.name}</h2>
                                        </a>
                                        <div className="rating">
                                            <span> <i className="fa fa-star"></i> </span>
                                            <span> <i className="fa fa-star"></i> </span>
                                            <span> <i className="fa fa-star"></i> </span>
                                            <span> <i className="fa fa-star"></i> </span>
                                            <span> <i className="fa fa-star-o"></i> </span>
                                        </div>
                                        <div className="price">{product.price}</div>
                                    </div>
                                </div> /* <!--***end of card-body and card div**--> */
                            ))}
                        </div>{/* <!--***end of row center**--> */}
                    </div>
                </main>

                <footer className="row center">
                    All right reserved to Burari Gang
        </footer>
            </div>
        </>);
}

export default App;
