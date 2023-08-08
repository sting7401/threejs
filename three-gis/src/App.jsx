import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import MyElement3D from './pages/MyElement3D';
import CarShow from './pages/CarShow';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/myElement3D" element={<MyElement3D />} />
        <Route path="/carShow" element={<CarShow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
