import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase/firebase';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import PageLayout from './layout/PageLayout';
import Profilepage from './pages/Profilepage';
import Loader from './components/Loader'; // Create a Loader component

function App() {
  const [authUser, loading] = useAuthState(auth); // Get auth state and loading status

  if (loading) {
    return <Loader />; // Show loader while authentication is in progress
  }

  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
          <Route path="/:username" element={<Profilepage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
