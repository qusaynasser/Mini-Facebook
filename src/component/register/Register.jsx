import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { registerSchema } from '../../validation/Validation'
import Input from '../shared/Input'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate=useNavigate();
    const initialValues=
    {
        username: '',
        name:'',
        email:'',
        password: '',
        image: '',
    }

    const onSubmit=async users => {
        try {
            const formData = new FormData();
            formData.append("username", users.username);
            formData.append("name", users.name);
            formData.append("email", users.email);
            formData.append("password", users.password);
            formData.append("image", users.image);
            
            const { data } = await axios.post("https://tarmeezacademy.com/api/v1/register", formData);
            console.log(data);
            if(data)
            {
                toast.success("User registered successfully");
                navigate("/login");
                formik.resetForm();
            }
        } catch (error) {
            if (error.response) {
                // الخادم رد بكود غير ناجح (مثل 400 أو 500)
                toast.error(`Error: ${error.response.data.message}`, { autoClose: false });
            } else if (error.request) {
                // لم يتم استلام أي استجابة من الخادم
                toast.error('No response from server. Please try again later.', { autoClose: false });
            } else {
                // خطأ أثناء إعداد الطلب
                toast.error('An error occurred. Please try again.', { autoClose: false });
            }
        }
    }

    const handelFileChange=(event)=>{
        formik.setFieldValue("image",event.target.files[0]);
    }
    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:registerSchema,
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
            id:"name",
            name:"name",
            type:"text",
            title:"Name",
            value:formik.values.name,
        },
        {
            id:"email",
            name:"email",
            type:"email",
            title:"Email",
            value:formik.values.email,
        },
        {
            id:"password",
            name:"password",
            type:"password",
            title:"Password",
            value:formik.values.password
        },
        {
            id:"image",
            name:"image",
            type:"file",
            title:"Select Image",
            onChange:handelFileChange,
        },
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
            onBlur={ input.onChange || formik.handleBlur}/>
        )
    })
    return (
        <div className="container ">
        <h1 className='mt-4 text-center border-addPost make-input-center'>Register</h1>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            
            {renderInput}
            <button type="submit" className="btn btn-primary btn-login" disabled={!formik.isValid}>Register</button>
            
        </form>
        </div>

    )
}

