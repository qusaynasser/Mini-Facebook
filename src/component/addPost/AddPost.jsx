import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
    const navigate=useNavigate();
    const {userToken}=useContext(UserContext);
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [image,setImage]=useState([]);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("test");
        const formData =new FormData();
        formData.append("title",title);
        formData.append("body",body);
        for(let i=0; i<image.length; i++)
        {
            formData.append("image",image[i]);
        }
        const headers={
            "Content-Type": "multipart/form-data",
            "authorization":`Bearer ${userToken}`
        }
        try
        {
            const {data}=await axios.post("https://tarmeezacademy.com/api/v1/posts",formData,
            {headers:headers});
            console.log(data);
            if(data)
            {
                toast.success("Post is added",{autoClose:false});
                navigate("/profile");
                window.location.reload();
            }
        }
        catch(err)
        {
            console.log(err);
        }

        setTitle("");
        setBody("");
        setImage([]);
    }

    return (
        <div className='container'>
            <h1 className='mt-4 text-center border-addPost make-input-center'>Add Post</h1>
            <form onSubmit={handleSubmit}>
                <div className='title mt-3 make-input-center'>
                    <label htmlFor="exampleInputTitle" className="form-label lable-input">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="body my-5 make-input-center">
                    <label htmlFor="floatingTextarea" className='lable-input mb-2'>Comments</label>
                    <textarea className="form-control" placeholder="Leave a comment here" value={body} onChange={(e)=>setBody(e.target.value)} id="floatingTextarea" defaultValue={""} />
                </div>
                <div className='image mt-3 make-input-center'>
                    <label htmlFor="exampleInputTitle" className="form-label lable-input">Image</label>
                    <input type="file" multiple className="form-control" onChange={(e)=>setImage(e.target.files)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="button mt-5">
                <button type="submit" className="btn btn-primary btn-post">Post</button>
                </div>
            </form>
        </div>
    )
}
