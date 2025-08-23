import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/QuickBlog-Assets/assets.js'
import BlogCard from './BlogCard.jsx';
import {motion} from "motion/react";
import { useAppContext } from '../context/AppContext.jsx';
const BlogList = () => {
  const[menu,setMenu]=useState("All");
  const{blogs,input}=useAppContext();
  const filteredBlogs=()=>{
    if(input===""){
      return blogs;
    }
    return blogs.filter((blog)=>{
      return blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase.includes(input.toLowerCase());
    })
  }
  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>        
          {
            blogCategories.map((blog,index)=>(
                <div key={index} className='relative'>
                    <button onClick={()=>setMenu(blog)} className={`cursor-pointer text-gray-500 ${menu==blog && "text-white px-4 pt-0.5"}`}>
                        {blog}
                        {menu==blog &&<motion.div 
                        layoutId='underline'
                        transition={{type:'spring',stiffness:500,damping:30}}
                        className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'>            
                        </motion.div>
                    }
                    </button>
                </div>
            )
                
            )
          }
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
            {/* ---- blog cards ----   */}
            {
                filteredBlogs().filter((blog)=>menu=="All"?true:blog.category==menu).map((blog)=>(
                       <BlogCard key={blog._id} blog={blog}>                          
                       </BlogCard>
                ))
            }
      </div>

    </div>
  )
}

export default BlogList
