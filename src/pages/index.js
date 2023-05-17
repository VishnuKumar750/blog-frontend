import React from "react"
import About from "@/components/About";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Posts from "@/components/Posts";
import Trending from "@/components/Trending";
import Head from "next/head";


export default function Home() {
  
  return (
    <>
    <Head>
      <title>Home</title>
      <meta name="description" content="Home" />
    </Head>
     <Navbar /> 
     <Hero />
     <Trending  />
     <Posts />
     <Category />
     <About/>
     <Footer />
    </>
   )
}

