import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { loginSchema } from '../../validation/Validation'
import Input from '../shared/Input'
import { UserContext } from '../context/User'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate=useNavigate();
    const {setUserToken,setUserId}=useContext(UserContext);

    const initialValues=
    {
        username: '',
        password: ''
    }

    const onSubmit=async (users) => {
        try {
            const { data } = await axios.post("https://tarmeezacademy.com/api/v1/login", users);
            console.log(data);
            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);
            localStorage.setItem("userId", data.user.id)
            setUserId(data.user.id);
            if (data.token) {
                navigate("/");
                toast.success("User logged in successfully");
            }
        } catch (error) {
            if (error.response) {
                // الخادم رد بكود غير ناجح (مثل 400 أو 500)
                toast.error(`Error: ${error.response.data.message}`, {autoClose:false});
            } else if (error.request) {
                // لم يتم استلام أي استجابة من الخادم
                toast.error('No response from server. Please try again later.',{autoClose:false});
            } else {
                // خطأ أثناء إعداد الطلب
                toast.error('An error occurred. Please try again.',{autoClose:false});
            }
        }
    }
    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:loginSchema,
    })

    const inputs=
    [
        {
            id:"username",
            name:"username",
            type:"text",
            title:"User Name",
            value:formik.values.username,
        },
        {
            id:"password",
            name:"password",
            type:"password",
            title:"Password",
            value:formik.values.password
        }
    ]
    
    const renderInput=inputs.map((input,index)=>{
        return(
            <Input key={index}
            id={input.id}
            name={input.name}
            type={input.type}
            value={input.value}
            title={input.title}
            onChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}/>
        )
    })
    return (
        <div className="container ">
        <h1 className='mt-4 text-center border-addPost make-input-center'>Login</h1>
        <form onSubmit={formik.handleSubmit} >
            
            {renderInput}
            <button type="submit" className="btn btn-primary btn-login" disabled={!formik.isValid}>Login</button>
            
        </form>
        </div>
    )
}
