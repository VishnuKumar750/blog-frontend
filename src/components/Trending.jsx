import React, { useCallback, useEffect, useRef, useState } from 'react'
import Card from './trending/Card'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrending } from '@/redux/Posts'

const Trending = () => {
  const [cardsToShow, setCardsToShow] = useState(1);
  const sliderRef = useRef()

  const { posts, loading,  } = useSelector(state => state.trending)

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
    dispatch(fetchTrending());
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
        {
          posts?.map((item, i) => (
            <Card key={i} item={item} onClick={handlePost}/>
          ))
        }
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