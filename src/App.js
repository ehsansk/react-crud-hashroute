import './App.css';
import 'react-toastify/dist/ReactToastify.css'
// import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { HashRouter,Route,Routes } from 'react-router-dom';
import AddItem from './components/addItem';
import Editproduct from './components/Editproduct';
import ProductList from './components/ProductList';


function App() {
  
  return (
    <div className="App">
    <HashRouter >
      <Routes>
      <Route exact path='/' element={<ProductList />} />
      <Route path='/addItem' element={<AddItem />} />
      <Route path='/editproduct/:id' element={<Editproduct />} />
      </Routes>
  </HashRouter>
     
    </div>
  );
}

export default App;
