import React, { useEffect, useState } from 'react'
import './SingleProduct.css'
import { useParams } from 'react-router-dom'
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../../Firebase/firebase';

const SingleProductPage = () => {

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);

  const fetchProductDetails = async () => {
    const productDoc = doc(db, "products", id);
    const docSnap = await getDoc(productDoc);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      setProduct(data);
      
      if (data.sellerId) {
        // Fetch seller details from users collection based on UID
        const q = query(collection(db, "users"), where("uid", "==", data.sellerId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setSeller(doc.data());
        });
      }
    } else {
      console.log("No such product!");
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading product...</div>;
  }

  const formattedPrice = new Intl.NumberFormat('en-IN').format(product.price);
  const postedDate = product.createdAt ? new Date(product.createdAt).toDateString() : 'Tue May 04 2021';

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={product.imageUrl}
          alt={product.productName}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {formattedPrice}</p>
          <span>{product.productName}</span>
          <p>{product.category}</p>
          <span>{postedDate}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{seller ? seller.name : "No name"}</p>
          <p>{seller ? seller.phoneNumber : "1234567890"}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage
