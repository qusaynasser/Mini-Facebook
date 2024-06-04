import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';

export default function ShowCommit() {
    const {userToken} = useContext(UserContext);
    const { commentId } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPosts = async () => {
        const { data } = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${commentId}`);
        // console.log(data);
        setData(data.data);
        setLoading(false);
        return data;
    }

    const [comment,setComment] = useState("");

    const createComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `https://tarmeezacademy.com/api/v1/posts/${commentId}/comments`, 
                { body: comment },
                { headers: { "Authorization": `Bearer ${userToken}` } }
            );
            console.log(data);
            // بعد إضافة التعليق، قم بتحديث التعليقات في الواجهة
            fetchPosts();
            toast.success("Comment created successfully",{autoClose:false});
            setComment(""); // إعادة تعيين حقل التعليق بعد الإرسال
        } catch (error) {
            console.error("Error creating comment:", error.response.data);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [])
    if (loading) {
        return <h1>Loading...</h1>
    }
    const defultImg = '../../../img/sous.jpg';
    return (
        <div className="container">
            <h1 className='make-input-center mt-5'>{data.author.name} Post</h1>
            <div className="col-9 m-auto mt-5" >

                <div className="card shadow" >

                    <div className="card-header">
                        <img src={data.author.profile_image ? data.author.profile_image : defultImg} alt="Profile" className="img-profile rounded-circle border border-3" />
                        <b>@{data.author.name}</b>
                    </div>
                    <div className="card-body">
                        <img src={data.image} className="img-post w-100" />
                        <h6 className="time-post mt-2">{data.created_at}</h6>
                        <h5 className="card-title mt-3">{data.title ? data.title : ""}</h5>
                        <p className="card-text ">{data.body}</p>
                        <hr />
                        <div className="comment ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pen me-1" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                            <span>({data.comments_count}) Comments
                                <span>
                                    <button className='btn-tag btn-sm rounded-5 ms-2'>
                                        {data.tags.name ? data.tags.name : <div>Policy</div>}
                                    </button>

                                </span>
                            </span>
                            <hr></hr>
                            {data.comments ? data.comments.map(comment =>
                                <>
                                    <div className="show-comment" key={comment.id}>


                                        <div className="img-profile d-flex " >
                                            <img src={comment.author.profile_image ? comment.author.profile_image : defultImg} alt='profile' className="img-profile rounded-circle border border-3 " />
                                            <b className='mt-2 ms-2'>{comment.author.username}</b>
                                        </div>

                                        <div className="user-comment mb-4">
                                            {comment.body}
                                        </div>


                                    </div>
                                </>
                            ) : null}

                            {userToken?
                            <form onSubmit={createComment}>
                                <div className="mt-2 d-flex">
                                    <input type="text" className="form-control" id="exampleInputText" placeholder='add your comment...' value={comment} onChange={(e)=>setComment(e.target.value)} />
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>
                            </form>
                            :null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
