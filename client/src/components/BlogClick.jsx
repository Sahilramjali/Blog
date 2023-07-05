
import{formatISO9075} from 'date-fns';
const BlogClick = ({ title, content, summary,image,createdAt }) => {
    
    
  return (
    <div className="wrapper" 
    >
      <div className="post">
        <div className="image">
          <img
            src={image}
            alt={title}
          />
        </div>
        <div className="texts">
          <h2>
            {title}
          </h2>
          <p className="info">
            <span className="author">Sahil Ramjali</span>
            {formatISO9075(new Date(createdAt),'MMM d, yyyy HH:mm')}
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
