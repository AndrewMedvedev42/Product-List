import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { checkProductDataType } from "./modules/functions";
import { loadProducts } from "./services/actions/postProduct";
import axios from "axios";

import "./App.css"

function App() {
  const [addMode, setAddMode] = useState(false)
  const dispatch = useDispatch()
  const productsList = useSelector((state) => state.products)
  console.log(productsList);

  useEffect(()=>{
      dispatch(loadProducts())
  },[])
  const submitProduct = async (event) => {
    event.preventDefault()
    try {
      const productData = {
        name: event.target.name.value,
        imageUrl:"https://dictionary.cambridge.org/ru/images/thumb/box_noun_002_04301.jpg?version=5.0.225",
        count: event.target.count.value,
        size:{
          width: event.target.width.value,
          height: event.target.height.value,
        },
        weight: `${event.target.weight.value}g`,
        comments:[]
    }
        axios.post("http://localhost:8000/products", productData)
        .then(res => dispatch(loadProducts()))
        .catch(err=>alert(err));
      setAddMode(false)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className="App">
      <section className="form-section">
      {!addMode ? (
        (<button className="submit-button" onClick={()=>{setAddMode(true)}}>Add Product</button>)
      ) :<section className="product-form-section">
          <form className="product-form" onSubmit={submitProduct}>
            <input name="name" type="text" placeholder="name" required/>
            <input name="count" type="text" placeholder="count" required/>
            <input name="width" type="text" placeholder="width" required/>
            <input name="height" type="text" placeholder="height" required/>
            <input name="weight" type="text" placeholder="weight" required/>
            <input className="submit-button" value="Add" type="submit"/>
          </form>
          <button className="danger-button" onClick={()=>{setAddMode(false)}}>Cancel</button>
        </section>
        }
      </section>
      <article>
        <ul className="product-list">
          {
          productsList.length ? (
            productsList.sort((a, b)=>{
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
          }).map((item)=>{
              const {id, imageUrl, name, count, size, weight, comments} = item
              return <li key={id}>
                      <img src={imageUrl}/>
                      <h2>{name}</h2>
                      <h4>{count}</h4>
                      <h5>{size.width}</h5>
                      <h5>{size.height}</h5>
                      <h4>{weight}</h4>
                      <form>
                        <input type="text" placeholder="Leave a comment"/>
                        <input type="submit" className="submit-button" value="Add"/>
                      </form>
                      <ul>
                        {comments.length ? (
                          comments.map(item=>{
                            return <li>{item}</li>
                          })
                        ): "No comments added"}
                      </ul>
                    </li>
            })
          ):<p>Sorry, no items found</p>
          }
        </ul>
      </article>
    </div>
  );
}

export default App;
