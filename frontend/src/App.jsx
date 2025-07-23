import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChildProfile from './pages/ChildProfile';
import ActivityGenerator from './pages/ActivityGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<ChildProfile />} />
        <Route path="/generate" element={<ActivityGenerator />} />
      </Routes>
    </Router>
  );
}
export default App;