import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { categories } from '../../../data'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { createPost } from '../api/PostsCalls'

const Post = () => {
  const [title, setTitle ] = useState('')
  const [content, setContent ] = useState('')
  const [tags, setTags ] = useState('')
  const [image, setImage ] = useState('')
  const [preview, setPreview] = useState('');

  const router = useRouter();
  const [disable, setDisable] = useState(false)

  const [errors, setErrors ] = useState({})

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setImage(reader.result);
      }
      reader.readAsDataURL(file)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = {}

    if(!title) {
      error.title = 'Title is required'
    }

    if(!content) {
      error.content = 'Content is required'
    }

    if(!tags) {
      error.tags = 'Tags is required'
    }


    if(errors.title !== "" || errors.content !== "" || errors.tags !== "") {
      setErrors(error)
      return
    }

    setDisable(true);

    try {
      const postCreateStatus = await createPost(title, content, tags, image)

      if(postCreateStatus?.success) {
        toast.success('Post Created Successfully')
        setTimeout(() => {
          router.replace('/');

        }, 2000);
      } else {
        toast.error('Post Creation Failed')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setDisable(false);
    }
  }

  useEffect(() => {}, [disable])

  const handleFocusTags = (e) => {
    setErrors({ ...errors, tags: '' })
  }

  const handleFocusTitle = (e) => {
    setErrors({ ...errors, title: '' })
  }

  const handleFocusContent = (e) => {
    setErrors({ ...errors, content: '' })
  }

  
  
  return (
   <>
   <Navbar />
    <div className="w-full h-full">
      <div className='lg:py-14 sm:py-10 md:px-10'>
         <div className='grid grid-cols-1 md:grid-cols-5 py-2 px-2 gap-10'>
            <div className='col-span-2'>
         <div className='w-full h-[50vh] my-2 relative'>
           <Image 
             src={preview || '/post/hero.jpg'}
               width={500}
               height={500}
               alt='img'
               className='w-full h-full object-cover'
           /> 
         <label  htmlFor='file' className=' absolute text-center w-full bottom-5 cursor-pointer text-white bg-gray-800 bg-opacity-50 p-2'>
          <Image 
           src="/logo/camera.svg"
            alt="camera"
            width={25}
            height={25}
            className='mx-auto'
          />
         </label>
         </div>
         <input type='file' accept='/image*'  id='file' onChange={handleImageChange} 
         className='hidden' 
         />
            </div>
            <form onSubmit={handleSubmit} className="w-full col-span-3 px-3">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-400 p-2 w-full outline-none " onFocus={handleFocusTitle}  />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>}

      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block font-bold mb-2">Content</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="border border-gray-400 outline-none p-2 w-full rounded" onFocus={handleFocusContent} ></textarea>
        {errors.content && <p className='text-red-500 text-sm'>{errors.content}</p>}

      </div>
      <div className="mb-4">
        <select className='py-2 px-2 outline-none border-2' value={tags} onFocus={handleFocusTags} onChange={(e) => setTags(e.target.value)} >
         {categories?.map((category, i) => (
            <option key={i} value={category.name}>{category.name}</option>
         ))}
        </select>
        {errors.tags && <p className='text-red-500 text-sm'>{errors.tags}</p>}
      </div>
      <div className="mb-4">
        <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${disable ? 'cursor-wait': 'cursor-pointer'}`} >
          Submit
        </button>
      </div>
    </form>
         </div>

      </div>

    </div>
   </>
  )
}

export default Post