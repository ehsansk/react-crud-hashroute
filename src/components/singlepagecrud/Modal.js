import React,{useState} from "react";
import { useForm, history } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from "axios";
import { toast } from "react-toastify";
import Loader from '../loder';

const schema = yup.object().shape({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
    category: yup.string().required('category is required'),
    price: yup.number().typeError('price is required'),
    image: yup.mixed().test('required','pls upload image',value=>{
        return value && value.length;
    }),
  }).required();

function Modal(props) {
   console.log("props=>",props.product)
  const [isLoading, setIsLoading] = useState(false);
  const [title,setTitle] = useState();
  const [description,setdescription] = useState();
  const [price,setprice] = useState();
  const [category,setcategory] = useState();
  const [image,setimage] = useState('');
  const [postProd,setPostProd] =useState({})
  const formdata ={title,description,price,category,image}
//    console.log('res ProdData=>',postProd)
    const {register, handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver(schema)
      });
         
      const resetForm =()=>{
          setTitle('');
          setdescription('');
          setprice('');
          setcategory('');
          setimage('')
      }
      const handleChange =(e) =>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
        //   console.log("e.target.result", e.target.result);
          setimage(e.target.result);
        };
      }
      const submitForm = (e)=>{
          e.preventDefault();
          
        console.log('data=>',formdata)
       
        setIsLoading(true)
        axios.post('https://fakestoreapi.com/products',formdata,{'Content-Type':'application/json' }).then(res=>{
           console.log(res);
           console.log(res.data);
           setIsLoading(false)
           if(res.status === 200){
             toast.success('Data Submitted Successfully')
              resetForm();
           }else{
             toast.error('something went wrong')
           }
        }).catch(err=>{
           setIsLoading(false)
           console.log(err);
        })
      }
  return (
    <>
    
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
            <form onSubmit={submitForm}>
              <div className="row p-4 text-left">
              <div className="form-group  col-12">
                    <label>Title</label>
                    <input type="text"  name="title" className="form-control" onChange={(e)=>setTitle(e?.target?.value)}  />
                    <p className='error-msg'>{errors.title?.message}</p>
                 </div>
                 <div className="form-group  col-12">
                    <label>Description</label>
                    <input type="text" name="description"  className="form-control" onChange={(e)=>setdescription(e?.target?.value)} />
                    <p className='error-msg'>{errors.description?.message}</p>
                 </div>
                 <div className="form-group  col-12">
                    <label>Price</label>
                    <input type="number"  name="price" className="form-control" onChange={(e)=>setprice(e?.target?.value)}  />
                    <p className='error-msg'>{errors.price?.message}</p>
                 </div>
                 <div className="form-group  col-12">
                    <label>Category</label>
                    <input type="text" name="category"  className="form-control" onChange={(e)=>setcategory(e?.target?.value)}  />
                    <p className='error-msg'>{errors.category?.message}</p>
                 </div>
                 <div className="form-group col-md-12 col-12">
                    <label>Image</label>
                    <input type="file" name="image"  className="form-control" onChange={handleChange}  accept="image/*" />
                    <p className='error-msg'>{errors.image?.message}</p>
                 </div>
                 <div className='form-group  col-12'>
                  <button type="submit"   className="btn btn-primary">Submit</button>
                 </div>
                 </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
