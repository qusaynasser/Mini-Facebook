import React from 'react'

export default function Input({type, value,title,id,name,errors,onChange,touched,onBlur}) {
  return (
    <div className='container my-5 w-75'>
        <label htmlFor={id} className="form-label lable-input">{title}</label>
        <div className="">
        <input type={type} className="form-control" id={id} aria-describedby="emailHelp" onChange={onChange} value={value} name={name} onBlur={onBlur}/>
        </div>
        {errors[name] && touched[name]&& <p className='text-danger'>{errors[name]}</p>}
    </div>
  )

}
