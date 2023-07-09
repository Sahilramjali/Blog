
import BlogClick from './BlogClick';

const BlogComponent = ({items}) => {
  return (
    <div style={{width:"100%"}}>
    {items.map((blog, index) => (
        <BlogClick
          key={blog._id}
          {...blog}
        />
      ))}
    </div>
  )
}

export default BlogComponent