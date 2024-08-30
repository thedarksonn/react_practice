import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'


const App = () => {
  return (
    <>



      <Router>
        <Routes>
          <Route path="/" element={<Username />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
          <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
          {/* <Route path="/password" element={<Password />} />
          <Route path="/profile" element={<Profile />} /> */}
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

    </>

  );
};

export default App;


// check how to use zustand. daily tuision