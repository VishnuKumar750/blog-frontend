import Card from '@/components/CategoryCard/Card';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PostCategory from '@/components/UserPost/PostCategory';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { PRODUCTION_URL } from '../../../constants';


const items = [
  {
    id: 1,
    image: "/post/hero.jpg",
    title: 'Title 1',
    description: 'Description 1',
    tags: ['tag1', 'tag2', 'tag3']
  },
  {
    id: 2,
    image: '/post/hero.jpg',
    title: 'Title 2',
    description: 'Description 2',
    tags: ['tag4', 'tag5', 'tag6']
  },
  {
    id: 3,
    image: '/post/hero.jpg',
    title: 'Title 3',
    description: 'Description 3',
    tags: ['tag7', 'tag8', 'tag9']
  },
  {
    id: 4,
    image: '/post/hero.jpg',
    title: 'Title 4',
    description: 'Description 4',
    tags: ['tag10', 'tag11', 'tag12']
  },
  {
    id: 5,
    image: '/post/hero.jpg',
    title: 'Title 5',
    description: 'Description 5',
    tags: ['tag13', 'tag14', 'tag15']
  },
  {
    id: 6,
    image: '/post/hero.jpg',
    title: 'Title 6',
    description: 'Description 6',
    tags: ['tag16', 'tag17', 'tag18']
  },
  {
    id: 7,
    image: '/post/hero.jpg',
    title: 'Title 7',
    description: 'Description 7',
    tags: ['tag19', 'tag20', 'tag21']
  },
  {
    id: 8,
    image: '/post/hero.jpg',
    title: 'Title 8',
    description: 'Description 8',
    tags: ['tag22', 'tag23', 'tag24']
  },
  {
    id: 9,
    image: '/post/hero.jpg',
    title: 'Title 9',
    description: 'Description 9',
    tags: ['tag25', 'tag26', 'tag27']
  },
  {
    id: 10,
    image: '/post/hero.jpg',
    title: 'Title 10',
    description: 'Description 10',
    tags: ['tag28', 'tag29', 'tag30']
  },
]

const Category = ( { posts } ) => {
   const router = useRouter();
   const { category } = router.query;

   console.log(posts);
  
   const handleRoute = (id) => {
      router.push('/Post/[post]', `/Post/${id}`)
    }

    const [numItemsToShow, setNumItemsToShow] = useState(5);
    const [ loading, setLoading ] = useState(false);

    const handleLoadMore = () => {
      setLoading(!loading); 
      setTimeout(() => {
        setLoading(!loading);
        setNumItemsToShow(numItemsToShow + 5);
      }, 3000);
    };


  return (
    <>
    <Head>
      <title>Categories</title>
      <meta name="description" content="Trending" />
    </Head>
    <Navbar />
      <div className='w-full h-[50vh] bg-sky-400 flex flex-col items-start justify-center lg:px-8'>
        <h1 className='text-[2.5rem] text-white font-bold mx-4'>Category</h1>
        <ul className='mx-4 flex items-center justify-around my-4 text-[1.2rem] text-white'>
          <li className='cursor-pointer'>
            <Link href={'/'}>
              Home
            </Link>  
          </li>
          <AiOutlineArrowRight className='mx-2'/>
          <li className='mx-2'>Category</li>
          <AiOutlineArrowRight className='mx-2'/>
          <li className=''>{category}</li>
        </ul>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-5 lg:px-8'>
      <div className='lg:col-span-3'>
      <div className='my-8'>
      {posts.map((item, i) => (
          <Card key={i} item={item} onClick={handleRoute}/>
        ))}
      </div>
      
      </div>
      {/* details */}
      <div className='lg:col-span-2'>
        <div>
          <PostCategory />
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.query;

  let posts = '';
  try {
    posts = await axios.get(`${PRODUCTION_URL}/api/posts/category/${category}`)
  } catch(err) {

  }

  return {
    props: {
      posts: posts.data.data,
    },
  };
}


export default Category