import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function  AppContextProvider({children}){
    const [loading , setLoading] = useState(false);
    // const [posts, setPosts]= useState([]);
    // const [page, setPage]= useState(1);
    // const [totalPages, setTotlePages]=  useState(null);
    // const navigate = useNavigate();
    
    //Data Filling pending 
    // async function fetchBlogPosts( page =1, tag=null , category) {
    //   setLoading(true);
      
    //   let url = `${baseUrl}?page=${page}`;
    //    if(tag){
    //      url += `&tag=${tag}`;
    //    }
    //    if(category){
    //      url+= `&category=${category}`;
    //    }
 
    //   try{
    //     const result = await fetch(url);
    //     const data = await result.json();
    //     console.log(data);
    //     setPage(data.page);
    //     setPosts(data.posts);
    //     setTotlePages(data.totalPages);
 
    //   }
    //    catch(error){
    //        toast.error("failed to get response")
    //        setPage(1);
    //        setPosts([]);
    //        setTotlePages(null);
 
    //    }
    //    setLoading(false);
     
    // }
 
//     const handlePageChange = (page) => {
//      navigate({search : `?page=${page}`});
//      setPage(page);
 
//    };
 
   
 
    const value ={
        // posts,
        // setPosts,
        loading,
        setLoading,
        // page,
        // setPage,
        // totalPages,
        // setTotlePages,
        // fetchBlogPosts,
        // handlePageChange
    };
 
     //step-2
    return <AppContext.Provider value={value}>
          {children}
    </AppContext.Provider>
       
 
 }