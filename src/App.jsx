import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import SearchResults from './pages/SearchResults';
import AdminPanel from './pages/AdminPanel';
import Test from './pages/Test';

function App() {
  return(
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/test" element={<Test />} />
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/listing/:listingId" element={<Listing />} />
    <Route path="/searchresults" element={<SearchResults />} />
    <Route element={<PrivateRoute />}>
    <Route path="/admin" element={<AdminPanel />} /> 
    <Route path="/profile" element={<Profile />} />
    <Route path="/create-listing" element={<CreateListing />} />
    <Route path="/update-listing/:listingId" element={<UpdateListing />} />
    </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App