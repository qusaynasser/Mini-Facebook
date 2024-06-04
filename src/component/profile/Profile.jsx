import React, { useContext, useEffect, useState } from 'react'
import style from './Profile.module.css'
import { UserContext } from '../context/User'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function Profile() {
    let {userData,userId,loading,setLoading,userToken}=useContext(UserContext);
    console.log(userId);
    const [postUser,setPostUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    
    const postsUser=async ()=>{
        const {data}=await axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`);
        console.log(data);
        setPostUser(data.data);
        setLoading(false);
        return data;
    }
    useEffect(() => {
        
        if (userId) {
            postsUser();
        }
    }, [userId,userData]);
    
    const deletePost = async (id) => {
        const {data} = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,
            {headers: {"Authorization": `Bearer ${userToken}`}});
        console.log(data);
        setPostUser(data => data.filter(post => post.id !== id)); // remove deleted post from state
        setShowModal(false);
        window.location.reload();
        return data;
    }

    const handleDeleteClick = (id) => {
        setPostIdToDelete(id);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);
    const handleConfirmDelete = () => {
        deletePost(postIdToDelete);
    }

    if(loading)
    {
        return <h1>Loading...</h1>
    }
  return (
    <div className="container">
        <div className={` ${style.container}`}>

            <div className="row">
            <div className="col-2">
                <div className={`${style.imgProfile} mt-5`}>
                    <img src={userData.profile_image} className=' rounded-circle ms-3'/>
                </div>
            </div>

            <div className="col-4 mt-5">
                <div className={`${style.userName} `}>
                    <b>{userData.email}</b>
                </div>
                <div className={`${style.userName} my-3`}>
                    <b>{userData.name}</b>
                </div>
                <div className={`${style.userName} `}>
                    <b>{userData.username}</b>
                </div>
            </div>

            <div className="col-4 mt-5">
                <div className={`${style.post}`}>
                    <span className={`${style.countPost} rounded-circle me-2`}>{userData.posts_count}</span>
                    <span>Posts</span>
                </div>
                <div className={`${style.post} mt-5`}>
                    <span className={`${style.countComment} rounded-circle me-2`}>{userData.comments_count}</span>
                    <span>Comments</span>
                </div>
            </div>
            </div>

        </div>

        <div className={`${style.posts}`}>
            <h1>{userData.name} Posts :</h1>

            {postUser && postUser.map((post) => (
                    <div className="col-9 m-auto mt-5" key={post.id}>
                        <div className="card shadow">
                            <div className="card-header">
                                <img src={post.author.profile_image} alt="Profile" className="img-profile rounded-circle border border-3" />
                                <b>@{post.author.name}</b>

                                <div className="d-flex justify-content-end position-relative">
                                    {Number(userId) === post.author.id && (
                                        <>
                                            <button type="button" className={`btn ${style.btnDangerr}`} onClick={() => handleDeleteClick(post.id)}>delete</button>
                                            <button type="button" className={`btn btn-secondary btn-edite ${style.btnEdite}`}>
                                                <Link to={`editePost/${post.id}`} className='text-decoration-none text-white'>edite</Link>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="card-body">
                                <img src={post.image} className="img-post w-100" alt="Post" />
                                <h6 className="time-post mt-2">{post.created_at}</h6>
                                <h5 className="card-title mt-3">{post.title ? post.title : ""}</h5>
                                <p className="card-text">{post.body}</p>
                                <hr />
                                <div className="comment">
                                    <Link to={`showComment/${post.id}`} className="text-decoration-none">
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pen me-1" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                            </svg>
                                            <span>
                                                ({post.comments_count}) Comments
                                            </span>
                                        </>
                                    </Link>
                                    <span>
                                        <button className='btn-tag btn-sm rounded-5 ms-2'>
                                            {post.tags.name ? post.tags.name : <div>Policy</div>}
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
                <div className="addPost">
                    {userToken ?
                        <Link to={"/addPost"}>
                            <div className="svg-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                </svg>
                            </div>
                        </Link>
                        :
                        null
                    }
                </div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}
