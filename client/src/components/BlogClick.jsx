
import{format} from 'date-fns';
import { IMG_URL } from '../constants/constant';
const BlogClick = ({ title, content, summary,image,createdAt,author,...rest }) => {
    const imgSrc=IMG_URL+image;
    
  return (
    <div className="wrapper" 
    >
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
    </div>
  );
};

export default BlogClick;
