
import BlogClick from './BlogClick';

const BlogComponent = ({items}) => {
  return (
    <>
    {items.map((blog, index) => (
        <BlogClick
          key={blog._id+index}
          {...blog}
        />
      ))}
    </>
  )
}

export default BlogComponent