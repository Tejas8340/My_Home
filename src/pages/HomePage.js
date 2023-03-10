import React from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const img1 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80";
  const img2 = "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80"
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <h1>Category</h1>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={img1} alt="Rent" style={{ width: "100%" }} />
              <button onClick={() => navigate('/category/rent')} className="btn">To Rent</button>
            </div>
          </div>
          <div className="col-md-5">  <div className="Imagecontainer">
            <img src={img2} alt="Sell" style={{ width: "100%" }} />
            <button onClick={() => navigate('/category/sale')} className="btn">To Sale</button>
          </div></div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage