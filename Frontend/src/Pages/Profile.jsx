import React, { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom';
import VerifyCode from '../Components/VerifyCode';

const Profile = () => {

  const navigete = useNavigate();

  const {user, isAuthenticated, popup, verifyEmail} = useAuthStore();

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  
  // useEffect(() => {
    // console.log("User → ",user);
    // console.log("isAuthenticated → ",isAuthenticated);
  // },[user])

  return (
    <section className='flexCenter min-h-[77vh] flex-col  '>

      <main className='flex sm:px-6 px-4 py-4 flex-col gap-y-5 items-start border-black border rounded-xl mx-auto min-w-[360px]'>

      <h2 className='mx-auto text-center font-bold text-xl mb-6 gradient-text1'>Profile</h2>

      {user && 
      <>
        <h2>Name : {user.name}</h2>
        <h2>Email : {user.email}</h2>
        <h2>Verified : {user.isVerified ? "Yes" : "No" }</h2>
      </>
      }

      <h2>Last Login : 
      {
        user.lastLogin ? formatDate(user.lastLogin) : "You just signed up!"
      }
      </h2>

      {
        !user.isVerified &&
        <button onClick={() => verifyEmail(user?.email)}>Verify now →</button>
      }
      </main>

      { popup && <VerifyCode /> }

    </section>
  )
}

export default Profile