import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams, useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './loder'

function Editproduct() {

  const [title,setTitle] = useState('');
  const [description,setdescription] = useState('');
  const [price,setprice] = useState('');
  const [category,setcategory] = useState('');
  const [image,setimage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  let params = useParams();
  let Navigate = useNavigate()
//   console.log(params.id)
  const updateProduct = ()=>{
      const formdata = {title,description,price,category,image}
      axios.put(`https://fakestoreapi.com/products/${params.id}`,formdata).then(res=>{
          console.log(res);
          console.log(res.data);
          if(res.status === 200){
          toast.success('data updated successfully')
          }else{
            toast.error('something wrong')
          }
          setTimeout(()=>{
            Navigate('/');
          },1000)
      })
  }
    const getSingleData = (id) =>{
      setIsLoading(true)
      axios.get(`https://fakestoreapi.com/products/${id}`).then(res=>{
        console.log(res);
        setTitle(res.data.title);
        setcategory(res.data.category);
        setdescription(res.data.description);
        setprice(res.data.price);
        setimage(res.data.image)
        setIsLoading(false)
    }).catch(error=>{
        console.log(error)

    })
    }
  useEffect(()=>{
      console.log('func called')
   getSingleData(params.id)
  },[params.id])

  return (
    <div>
      {isLoading === true &&(
         <Loader />
      )}
      <ToastContainer />
        <h3 className='text-center text-white bg-info py-3'>Edit Product</h3>
        <div className='container'>
        <div className='text-left mb-2'>
          <Link to="/" className='btn btn-sm btn-outline-info'>Back</Link>
          </div>
            <div className='edit-product'>
            <div className="form card text-left">
                  <div className="row p-4">
                 <div className="form-group col-md-6 col-12">
                    <label>Title</label>
                    <input type="text" value={title}  onChange={e=>{setTitle(e.target.value)}} className="form-control" name='title' required />
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Description</label>
                    <input type="text" value={description} onChange={e=>{setdescription(e.target.value)}} className="form-control" name='description' required />
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Price</label>
                    <input type="number" value={price} onChange={e=>{setprice(e.target.value)}} className="form-control" name='Price' required />
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Category</label>
                    <input type="text" value={category} onChange={e=>{setcategory(e.target.value)}} className="form-control" name='category' required />
                 </div>
                 <div className="form-group col-md-12 col-12">
                    <label>Image</label>
                    <input type="file"  onChange={e=>{setimage(e.target.value)}} className="form-control" name='image' required />
                    <img src={image} alt="img" height="100"/>
                 </div>
                 <div className='form-group col-md-6 col-12'>
                  <button type="submit" onClick={updateProduct} className="btn btn-primary">Save</button>
                 </div>
                 </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Editproduct