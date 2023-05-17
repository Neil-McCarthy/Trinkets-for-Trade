import {Routes, Route} from 'react-router-dom';

import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='users'>
          <Route path='usersList' element={<UsersList />} />
          <Route path=':id' element={<EditUser />} />
          <Route path='newUser' element={<NewUserForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
