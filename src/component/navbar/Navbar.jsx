import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'

export default function Navbar() {
  const navigate = useNavigate();
  let { userToken, setUserToken, loading, setUserData,userData } = useContext(UserContext);
// console.log("usetToken in navbar=="+userToken);

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate("/");
  }
  if(loading&&userToken){
    return <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>  
  }

  const handelProfileClick = () => {
    if(!userToken)
    {
      navigate("login");
    }
    else
    {
      navigate("profile")
    }
  }
  return (
    <div className='container navbars'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>Q-D</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item mt-1 ">
                <Link className="nav-link active " aria-current="page" to={"/"}>Home</Link>
              </li>
              <li className="nav-item mt-1">
                <a className="nav-link" onClick={handelProfileClick} style={{ cursor: 'pointer' }}>Profile</a>
              </li>
            
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item dropdown">
                {!userToken?
                <>
                <a className="nav-link dropdown-toggle mt-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
                </>
                :
                <>
                
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData&&userData.username}
                  <img src={userData&&userData.profile_image} className="img-navbar img-fluid rounded-circle border border-3"/>
                </a>
                </>
                }
                <ul className="dropdown-menu">
                  {!userToken?
                  <>
                  <li><Link to={"/login"} className='text-decoration-none '><a className="dropdown-item" href="#">Login</a></Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to={"/register"} className='text-decoration-none'><a className="dropdown-item" href="#">Register</a></Link></li>
                  </>
                  :
                  <>
                  <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                  </>
                  }
                </ul>
              </li>
            </ul>
          </div>
            
          
        </div>
      </nav>

    </div>
  )
}
