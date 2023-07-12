
import { Helmet } from 'react-helmet-async'

const SEO = ({title,content,link}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={content}/>
        <link rel='canonical' href={`#/${link}`}/>
    </Helmet>
  )
}

export default SEO;