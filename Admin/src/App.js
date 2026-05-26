import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './admin/dashboard';
import Users from './admin/users';
import Courses from './admin/courses';
import PaidUsers from './admin/paidusers';
import Admins from './admin/admins';
import Terms from './admin/terms';
import Privacy from './admin/privacy';
import Cancellation from './admin/cancellation';
import Refund from './admin/refund';
import Billing from './admin/billing';
import Error from './pages/error';
import Deletion from './admin/deletion';

function App() {

  return (
    <Router>
      <div>
        <ToastContainer
          limit={3}
          progressClassName={sessionStorage.getItem('darkMode') === 'true' ? "toastProgressDark" : "toastProgress"}
          bodyClassName={sessionStorage.getItem('darkMode') === 'true' ? "toastBodyDark" : "toastBody"}
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={sessionStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'}
        />
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/users' element={<Users />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/paid' element={<PaidUsers />} />
          <Route path='/admins' element={<Admins />} />
          <Route path='/editterms' element={<Terms />} />
          <Route path='/deletion' element={<Deletion />} />
          <Route path='/editprivacy' element={<Privacy />} />
          <Route path='/editcancellation' element={<Cancellation />} />
          <Route path='/editrefund' element={<Refund />} />
          <Route path='/editbilling' element={<Billing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
