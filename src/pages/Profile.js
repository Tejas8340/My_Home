import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDoneOutline } from 'react-icons/md';
import { async } from '@firebase/util';
import {doc, updateDoc} from 'firebase/firestore'

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const { name, email } = formData

  const logoutHandler = () => {
    auth.signOut();
    toast.success('successfully logout');
    navigate("/");
  }
  const onSubmit = async() => {
    try{
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{
          displayName:name
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {name});
        toast.success("User Updated")
      }
    }catch (error) {
      console.log(error)
      toast('Something Went Wrong')
    }
  }
  const onChange = (e) => {
     setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
     }));
  };
  return (
    <Layout>
      <div className="container mt-4 w-50 d-flex justify-content-between">
        <h4>Profile Details</h4>
        <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
      </div>
      <div className="container mt-4 card" style={{ width: '18rem' }}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <p>User Personal Details</p>
            <span style={{ cursor: "pointer" }}
              onClick={() => { changeDetails && onSubmit(); setChangeDetails(prevState => !prevState) }}
            >
              {changeDetails ? (<MdOutlineDoneOutline color="green" />) : (<FaEdit color="red" />)}
            </span>
          </div>
        </div>
        <div className="card-body">
          <form>
          <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" value={name} onChange={onChange} disabled={!changeDetails} />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" value={email} class="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} disabled={!changeDetails}/>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile