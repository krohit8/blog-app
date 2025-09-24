import { Appbar } from '@/components/Appbar'
import { BlogCard } from '@/components/BlogCard'


export const Blogs = () => {
  return (
    <div className=' h-screen w-full  '>
        <div className='mb-8'><Appbar/></div>
        <BlogCard id={22} authorName='Rohit' title='The Future of Web Development: Exploring Modern Frontend Frameworks' content='In this comprehensive guide, we dive deep into the evolution of web development and explore how modern frontend frameworks like React, Vue, and Angular are shaping the future of user interfaces. From component-based architecture to state management patterns, discover the tools and techniques that are revolutionizing how we build web applications today.' publishedDate={new Date}  />
        
    </div>

)
}
