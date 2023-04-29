import React, { useCallback, useEffect, useRef, useState } from 'react'
import Card from './trending/Card'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/router'
import LoadingSkeleton from './trending/LoadingSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrending, fetchTrendingFailure, fetchTrendingStart, fetchTrendingSuccess } from '@/redux/Posts'
import Head from 'next/head'
import axios from 'axios'
import { PRODUCTION_URL } from '../../constants'

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
]



const Trending = () => {
  const [cardsToShow, setCardsToShow] = useState(1);
  const sliderRef = useRef()
  const { loading,  posts } = useSelector(state => state.trending)

  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setCardsToShow(4);
      } else if (window.innerWidth > 768) {
        setCardsToShow(3);
      } else {
        setCardsToShow(1);
      }
    };    
    window.addEventListener("resize", handleResize);
    handleResize(); // set initial state
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const fetchTrending = async () => {
      dispatch(fetchTrendingStart())
      try {
        const res = await axios.get(`${PRODUCTION_URL}/api/posts/trending`, {
          headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
          }
        })
        console.log(res.data);
        dispatch(fetchTrendingSuccess(res.data.data))
      } catch (error) {
        dispatch(fetchTrendingFailure(error.message))
      }
    }
    fetchTrending()
  },[dispatch])

  const handlePrev = () => {
    sliderRef.current.slickPrev()
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cardsToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  };

  const router = useRouter()

  const handlePost = (id) => {
    router.push(`/Post/${id}`)
  }
  
  return (
    <div className='min-w-full px-8'>
      <div className='flex flex-col items-center justify-center mt-20 mb-8'>
        <h1 className='text-4xl font-bold mb-4 4xl:text-[5em] 4xl:my-14'>Trending</h1>
        <p className='text-[1.2rem] text-center leading-8 text-gray-700 font-medium font-serif  max-w-6xl 4xl:text-[3rem] 4xl:my-4 4xl:max-w-full 4xl:leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium at quaerat aliquid velit dolor fugiat ad voluptatibus iusto alias quis accusantium natus, cumque hic dolorem eveniet laboriosam soluta facilis ipsam.</p>
      </div>

      <div className='flex flex-col items-center justify-center md:flex-row px-2 md:px-8'>
        <div className='w-full h-full'>
        <Slider {...settings} ref={sliderRef}>
        { loading ? (
          [...Array(10)]?.map((item, i) => (
            <LoadingSkeleton  key={i}/>
          ))
        ) : (
          posts?.map((item, i) => (
            <Card key={i} item={item} onClick={handlePost}/>
          )))}
          </Slider>
        </div>

      <div className="flex md:flex-col items-center justify-center ">
        <div className='mx-2 my-4 border-2 p-2 cursor-pointer ' onClick={handlePrev}>
          <AiOutlineArrowUp className='text-[1.2rem]'/>
        </div>
        <div className='mx-2 border-2 p-2 cursor-pointer' onClick={handleNext}>
        <AiOutlineArrowDown className='text-[1.2rem]'/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Trending