import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";


const useFetchCollection = (collectionName) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getCollection =() => {
      setIsLoading(true);

        try {
          
          const docRef = collection(db, collectionName);
          const q = query(docRef, orderBy("createdAt", "desc"));
    
          onSnapshot(q, (querySnapshot) => {
          console.log(querySnapshot.docs)
          const allData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          console.log(allData)
          setData(allData)
          setIsLoading(false);

        //   dispatch(GET_PRODUCT(
        //     {
        //       products:allProducts,
        //     }
        //   )
          
          //)
     
    });
    
    
        } catch (error) {
          setIsLoading(false);

          toast.error(error.message)
        }
      }

  useEffect(() => {
    getCollection()
  }, [])
  
  return{data, isLoading}

}


export default useFetchCollection;