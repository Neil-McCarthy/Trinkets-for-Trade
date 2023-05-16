import {Routes, Route} from 'react-router-dom';

import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='usersList' element={<UsersList />} />
      </Route>
    </Routes>
  );
}

export default App;
