import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout'
import { BsFillEyeFill } from 'react-icons/bs'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'
import OAuth from '../components/OAuth';


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        toast.success('Login Success');
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Email or Password');
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={loginHandler}>
          <h4 className="bg-dark p-2 mt-2 text-light text-center">Sign In</h4>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" value={email} class="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={onChange} id="password" className="form-control" />
            <span>Show Password<BsFillEyeFill className="text-danger" style={{ cursor: 'pointer ms-2' }} onClick={() => { setShowPassword((prevState) => !prevState); }} /></span> <br />
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
          <OAuth />
          <div className="mt-2">
            <span>New User</span><Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Signin