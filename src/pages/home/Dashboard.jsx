import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '../../redux/slices/authSlice';
const Dashboard = () => {

  const dispatch = useDispatch();
  
  const { user, loading, error } = useSelector(selectAuth);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.nombres}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>

    </div>
  )
}

export default Dashboard
