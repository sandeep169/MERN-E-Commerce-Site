import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

// import Rating from './components/Rating';
const  App=()=> {
    return (
        <> 
        <BrowserRouter >
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
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
                </main>

                <footer className="row center">
                    All right reserved to CodeFinder pvt tech.
        </footer>
            </div>
            </BrowserRouter>
        </>);
}

export default App;
