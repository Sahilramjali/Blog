
import BlogClick from './BlogClick';

const BlogComponent = ({items}) => {
  return (
    <div className='blogcomp-div'>
    {items.map((blog, index) => (
        <BlogClick
          key={blog._id+index}
          {...blog}
        />
      ))}
    </div>
  )
}

export default BlogComponent