import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../loder";
import { Link } from "react-router-dom";

function SinglePage() {
    const [title,setTitle] = useState();
    const [description,setdescription] = useState();
    const [price,setprice] = useState();
    const [category,setcategory] = useState();
    const [image,setimage] = useState('');
  const formdata ={title,description,price,category,image}


  const [product, setProduct] = useState([]);
  const [data, setdata] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "https://fakestoreapi.com";
  // console.log('product =>',product)
  useEffect(() => {
    getAlldata();
  }, []);

  const getAlldata = () => {
    setIsLoading(true);
    axios.get(`${BASE_URL}/products?limit=10`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
      localStorage.setItem('data',JSON.stringify(res.data))
      setIsLoading(false);
    });
  };
   const filterData =(id) =>{
    const newproduct =  product.filter((el)=>{
        return el.id !== id
      })
    //   console.log("before delete=>",product)
      setProduct(newproduct)
    //   console.log("after delete=>",product)
   }
  const deleteProduct = (id) => {
    console.log("id=>", id);
    setIsLoading(true);
    axios.delete(`${BASE_URL}/products/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.status === 200) {
        setIsLoading(false);
        filterData(id);
        toast.success("data has been deleted successfully");

      } else {
        setIsLoading(false);
        toast.error("something wrong");
      }
    });
    getAlldata();
  };

// modal functionality

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
       const resId =Math.floor(Math.random(res.data.id) *100); 
       const resData= res.data
       product.push(res.data)
  console.log('product =>',product)

        resetForm();
     }
     if(res.status === 413){
       toast.error('file size too large')
     }
  }).catch(err=>{
     setIsLoading(false)
     console.log(err);
  })
}

const handleChange =(e) =>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
    //   console.log("e.target.result", e.target.result);
      setimage(e.target.result);
    };
  }
  const resetForm =()=>{
    setTitle('');
    setdescription('');
    setprice('');
    setcategory('');
    setimage('')
}

  return (
    <>
      {isLoading === true && <Loader />}
      <ToastContainer />
      <h3 className="bg-info text-white py-3">Product List</h3>
      <div className="text-right mb-3 mr-3">
        {/* <Link to="/addItem" className="btn btn-primary ml-auto" >
          Add Item
        </Link> */}
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
  add Item
</button>
      </div>
      <div className="container-fluid">
        <div className="wrapper">
          <div className="row">
            {product?.length > 0 &&
              product.map((el,index) => {
                return (
                  <div key={index} className="col-md-3 mb-3">
                    <div className="card product-card">
                      <img
                        src={el?.image}
                        className="card-img-top border-bottom border-dark w-100"
                        alt="product img"
                      />
                      <div className="card-body">
                        <p className="card-text text-truncate">{el?.title}</p>
                        <div className="d-flex justify-content-between">
                          <p>
                            <strong>Cate : {el?.category}</strong>
                          </p>
                          {el?.rating?.rate &&(
                          <p>Rate : {el?.rating?.rate}</p>
                          )}
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>
                            <strong>Price : {el?.price}</strong>
                          </p>
                          {el?.rating?.count &&(
                          <p>Stock : {el?.rating?.count}</p>
                          )}
                        </div>
                        <div className="action">
                          <div className="d-flex justify-content-between">
                            <Link className="btn text-warning btn-outline-warning btn-sm" to={`/editproduct/${el?.id}`}>
                             
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fillRule="currentColor"
                                  className="bi bi-pencil-square"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                  <path
                                    fillrule-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                  />
                                </svg>
                            </Link>
                           
                              <button onClick={(e) => deleteProduct(el?.id)}
                              className="btn text-danger btn-outline-danger btn-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fillrulerule="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fillrule-rule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

{/* modal */}
  {/* <Modal  product={product} setProduct={setProduct} /> */}
{/* modal end */}
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
                 </div>
                 <div className="form-group  col-12">
                    <label>Description</label>
                    <input type="text" name="description"  className="form-control" onChange={(e)=>setdescription(e?.target?.value)} />
                 </div>
                 <div className="form-group  col-12">
                    <label>Price</label>
                    <input type="number"  name="price" className="form-control" onChange={(e)=>setprice(e?.target?.value)}  />
                 </div>
                 <div className="form-group  col-12">
                    <label>Category</label>
                    <input type="text" name="category"  className="form-control" onChange={(e)=>setcategory(e?.target?.value)}  />
                 </div>
                 <div className="form-group col-md-12 col-12">
                    <label>Image</label>
                    <input type="file" name="image"  className="form-control" onChange={handleChange}  accept="image/*" />
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

export default SinglePage;
