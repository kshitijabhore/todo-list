import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TODOListPage from './Component/TODOListPage';
import AddListItems from './Component/AddListItems';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path='/' element={<TODOListPage/>}></Route>
        <Route exact path='/addListItems' element={<AddListItems/>}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
