import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { UserContext } from '../context/User';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


export default function Home() {
    let {userToken, userId} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    const fetchPosts = async () => {
        const {data} = await axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${page}&limit=5`);
        console.log(data);
        setData(pre => [...pre, ...data.data]);
        setLoading(false);
        return data;
    }

    // Infinite Scrolling....
    useEffect(() => {
        fetchPosts();

        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight + 1 >= scrollHeight) {
                setPage(prevPage => prevPage + 1);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page]);

    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition && location.state && location.state.fromComment) {
            window.scrollTo(0, parseInt(savedScrollPosition));
        }

        return () => {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        };
    }, [location]);

    const deletePost = async (id) => {
        const {data} = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,
            {headers: {"Authorization": `Bearer ${userToken}`}});
        console.log(data);
        setData(data => data.filter(post => post.id !== id)); // remove deleted post from state
        setShowModal(false);
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

    if (loading) {
        return <h1>Loading</h1>
    }

    return (
        <>
            <div className="container content ">
                {data && data.map((post) => (
                    <div className="col-9 m-auto mt-5" key={post.id}>
                        <div className="card shadow">
                            <div className="card-header">
                                <img src={post.author.profile_image} alt="Profile" className="img-profile rounded-circle border border-3" />
                                <b>@{post.author.name}</b>

                                <div className="d-flex justify-content-end position-relative">
                                    {Number(userId) === post.author.id && (
                                        <>
                                            <button type="button" className="btn btn-dangerr" onClick={() => handleDeleteClick(post.id)}>delete</button>
                                            <button type="button" className="btn btn-secondary btn-edite">
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
        </>
    )
}
