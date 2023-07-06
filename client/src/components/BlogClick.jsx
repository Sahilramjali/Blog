
import{format} from 'date-fns';
import { IMG_URL } from '../constants/constant';
import { Link } from 'react-router-dom';
const BlogClick = ({ _id,title, content, summary,image,createdAt,author,...rest }) => {
    const imgSrc=IMG_URL+image;
    
  return (
    <div className="wrapper"> 
    <Link className='links' to={`/post/${_id}`}>
    <div className="post">
        <div className="image">
          <img
            src={imgSrc}
            alt={title}
          />
        </div>
        <div className="texts">
          <h2>
            {title}
          </h2>
          <p className="info">
            <span className="author">{author?.username}</span>
            {format(new Date(createdAt),'MMM d, yyyy HH:mm')}
          </p>
          <p className="summary">
            {summary}
          </p>
        </div>
      </div>
    </Link>
      
    </div>
  );
};

export default BlogClick;
