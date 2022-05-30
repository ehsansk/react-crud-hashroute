import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Loader from './loder'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

const schema = yup.object({
   title: yup.string().required('title is required'),
   description: yup.string().required('description is required'),
   category: yup.string().required('category is required'),
   price: yup.number().typeError('price is required'),
   image: yup.mixed().required('pls upload image'),
 }).required();

function AddItem() {
   let Navigate = useNavigate();
  const [title,setTitle] = useState();
  const [description,setdescription] = useState();
  const [price,setprice] = useState();
  const [category,setcategory] = useState();
  const [image,setimage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const formdata ={title,description,price,category,image}
  let location  = useLocation();
  console.log('location=>',location)
  
//   const submitData =(e)=>{
//      setIsLoading(true)
//     axios.post('https://fakestoreapi.com/products',formdata).then(res=>{
//        console.log(res);
//        console.log(res.data);
//        setIsLoading(false)
//        if(res.status === 200){
//          toast.success('Data Submitted Successfully')
//        }else{
//          toast.error('something went wrong')
//        }
//        setTimeout(()=>{
//          Navigate('/');
//        },2000)
//     }).catch(err=>{
//        setIsLoading(false)
//        console.log(err);
//     })
//   }

 const {register, handleSubmit, formState:{ errors }} = useForm({
   resolver: yupResolver(schema)
 });

 
 const submitForm = (formdata)=>{
   console.log(formdata)
   setIsLoading(true)
   axios.post('https://fakestoreapi.com/products',formdata).then(res=>{
      console.log(res);
      console.log(res.data);
      setIsLoading(false)
      if(res.status === 200){
        toast.success('Data Submitted Successfully')
      }else{
        toast.error('something went wrong')
      }
      setTimeout(()=>{
         Navigate('/');
         },1000)
   }).catch(err=>{
      setIsLoading(false)
      console.log(err);
   })
 }

  return (
      <>
      {isLoading === true &&(
         <Loader />
      )}
      <ToastContainer />
    <h3 className='text-center text-white bg-info py-3'>AddItem</h3>
        <div className="container">
        <div className='text-left mb-2'>
    <Link to="/" className='btn btn-sm btn-outline-info'>Back</Link>
    </div>
           <div className="card text-left">
              <form onSubmit={handleSubmit(submitForm)}>
              <div className="row p-4">
              <div className="form-group col-md-6 col-12">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control" {...register('title')}  />
                    <p className='error-msg'>{errors.title?.message}</p>
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Description</label>
                    <input type="text" name="description"  className="form-control" {...register('description')}  />
                    <p className='error-msg'>{errors.description?.message}</p>
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Price</label>
                    <input type="number" name="price" className="form-control" {...register('price')}  />
                    <p className='error-msg'>{errors.price?.message}</p>
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Category</label>
                    <input type="text" name="category" className="form-control" {...register('category')}  />
                    <p className='error-msg'>{errors.category?.message}</p>
                 </div>
                 <div className="form-group col-md-12 col-12">
                    <label>Image</label>
                    <input type="file" name="image" className="form-control" {...register('image')}  />
                    <p className='error-msg'>{errors.image?.message}</p>
                 </div>
                 <div className='form-group col-md-6 col-12'>
                  <button type="submit"  className="btn btn-primary">Submit</button>
                 </div>
                 </div>
              </form>
           </div>
        </div>

    </>
  )
}

export default AddItem