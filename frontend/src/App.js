import {Routes, Route} from 'react-router-dom';

import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import TrinketsList from './features/trinkets/TrinketsList';
import EditTrinket from './features/trinkets/EditTrinket';
import NewTrinketForm from './features/trinkets/NewTrinketForm';
import SingleTrinket from './features/trinkets/SingleTrinket';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route element={<PersistLogin />}>
              <Route element={<Prefetch />}>
                <Route path='users'>
                <Route index element={<UsersList />} />
                <Route path='edit/:id' element={<EditUser />} />
              </Route>
              <Route path='newUser' element={<NewUserForm />} />
            </Route>
            <Route path='trinkets'>
            <Route path=':id' element={<SingleTrinket />} />
              <Route element={<Prefetch />}>
                <Route path='edit/:id' element={<EditTrinket />} />
                <Route path='newTrinket' element={<NewTrinketForm />} />
              </Route>
              <Route index element={<TrinketsList />} />
            </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
