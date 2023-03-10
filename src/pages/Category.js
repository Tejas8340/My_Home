import React,{useState, useEffect} from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import {db} from "./../firebase.config";
import {toast} from 'react-toastify';
import { collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore';
import { async } from "@firebase/util";

const Category = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    // fetch listing
    useEffect(()=>{
        const fetchListing = async () => {
           try{
            //refrence 
            const listingsRef = collection(db, 'listings');
            //query
            const q = query(listingsRef,
                where('type','==', params.categoryName),
                orderBy('timestamp','desc'),
                limit(10)
                );
                //ecexute query
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                    console.log(doc.data());
                });
           } catch (error) {
            console.log(error);
            toast.error("Unable to fetch Data");
           }
        };
        //fuction Call
        fetchListing();
    },[params.categoryName]);
    return <Layout>category</Layout>;
};
export default Category;