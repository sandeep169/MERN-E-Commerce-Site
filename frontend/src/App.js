import './App.css';
import {BrowserRouter,Link,Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';
import { Contact } from './Contact';
import { Footer } from './Footer';
import Register from './Register';
import { FetchApi} from './FetchApi';


// import Rating from './components/Rating';

const  App=()=> {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <> 
        <BrowserRouter >
            <div className="grid-container">
                <header className="row">
                    <div>
                        {/* <!-- logo --> */}
                        <Link className="brand" to="/">AshurLok</Link>
                    </div>
                    <div>
                    <Link to="/products">products</Link>
                        {/* <!-- links --> */}

                        <Link to="/cart">Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        <Link to="/FetchApi">Fetch Api</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/Register">Sign Up</Link>
                    </div>
                </header>
                {/* <!-- image size 680px by 830 px --> */}
                {/* <!-- body of card ,, product body  --> */}
                <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/products" component={HomeScreen}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route path="/Register" component={Register}></Route>
                <Route path="/FetchApi" component={FetchApi}></Route>

                </main>
                <footer className="row center">
                    {/* All right reserved to Klieder House. */}
                            <Footer />
        </footer>
            </div>
            </BrowserRouter>
        </>);
}

export default App;
