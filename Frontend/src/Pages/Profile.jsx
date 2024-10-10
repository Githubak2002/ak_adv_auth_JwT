import React, { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import VerifyCode from '../Components/VerifyCode';
import { useNavigate } from 'react-router-dom';
import DeleteAccountPopup from '../Components/DeleteAccountPopup';

const Profile = () => {

  const navigete = useNavigate();
  
  const {user, popup, verifyEmail, isUserVerified, deleteAcount, deleteAccPopup} = useAuthStore();

  const formatDate = (date) => {
    const options = {  
      day: 'numeric',
      month: 'long',
      // month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour format
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // const deleteHandler = () => {
  //   deleteAcount();
  //   navigete('/');
  // }

  const deleteHandlerPopup = () => {
    useAuthStore.setState({ deleteAccPopup: true });
  }

  
  // useEffect(() => {
    // console.log("User → ",user);
    // console.log("isAuthenticated → ",isAuthenticated);
  // },[user])

  return (
    <section className='flexCenter min-h-[77vh] flex-col  px-3'>

      <main className='flex sm:px-6 px-4 py-4 flex-col gap-y-5 items-start border-black border rounded-xl mx-auto sm:min-w-[360px]'>

      <h2 className='mx-auto text-center font-bold text-xl mb-6 gradient-text1 pt-2'>Profile</h2>

      {user && 
      <>
        <h2>Full Name : {user.name}</h2>
        <h2>Email : {user.email}</h2>
        <h2>Verified : {isUserVerified ? "Yes" : "No" }</h2>
        {/* <h2>Verified : {isUserVerified ? "Yes" : "No" }</h2> */}
      </>
      }


      {
        // !user.isVerified &&
        !isUserVerified &&
        <button className='text-blue-500' 
        onClick={() => verifyEmail(user?.email)}
        
        >Verify now →</button>
      }

      <h2>Last Login :  
      {
        user.lastLogin ? <span> {formatDate(user.lastLogin)}</span> : "You just signed up!"
      }
      </h2>

      <div className='flex justify-end w-full'>

      <button onClick={deleteHandlerPopup} className='p-2 hover:scale-110 text-red-500 transition-all rounded-lg mb-3'>Delete Account</button>
      </div>
      </main>

      { popup && <VerifyCode /> }



      {deleteAccPopup && <DeleteAccountPopup />}



    </section>
  )
}

export default Profile