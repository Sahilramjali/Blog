
import{format} from 'date-fns';

import { Link } from 'react-router-dom';
const BlogClick = ({ _id,title, content, summary,url,createdAt,author }) => {
  
    
  return (
    <div className="wrapper"> 
    <Link className='links' to={`/post/${_id}`}>
    <div className="post">
        <div className="image">
          <img
            src={url}
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
