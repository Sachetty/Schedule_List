import {BrowserRouter, Route, Routes} from 'react-router-dom';
import User from './pages/Users';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path= '/' element={<User/>}/>
      {/* <Route path= '/:username' element={<User/>}/> */}
      <Route path= '/contact/:userId' element={<Contact/>}/>
    </Routes>


    </BrowserRouter>
  );
}

export default App;
