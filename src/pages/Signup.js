import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify';
import { BsFillEyeFill } from 'react-icons/bs'
import { getAuth, createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth'
import { db } from '../firebase.config'
import { async } from '@firebase/util'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import OAuth from '../components/OAuth';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db,'users', user.uid), formDataCopy);
      toast.success('signup successfully !');
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error('something went Wrong');
    }
  };
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onSubmitHandler}>
          <h4 className="bg-dark p-2 mt-2 text-light text-center">Sign Up</h4>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Enter Name</label>
            <input type="text" value={name} className="form-control" id="name" aria-describedby="nameHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" value={email} className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type={showPassword ? 'text' : "password"} value={password} onChange={onChange} id="password" className="form-control" />
            <span>Show Password<BsFillEyeFill className="text-danger" style={{ cursor: 'pointer ms-2' }} onClick={() => { setShowPassword((prevState) => !prevState); }} /></span>
          </div>
          <button type="submit" class="btn btn-primary">Sign Up</button>
          <div>
            <OAuth />
            <span>Already User</span><Link to="/signin">Login</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Signup;