
// export const GLOBAL_URL='http://localhost:4000/api/';
export const GLOBAL_URL='https://blog-api-n765.onrender.com/api/'
export const REGISTER_API_URL=GLOBAL_URL+"auth/signup";
export const LOGIN_API_URL=GLOBAL_URL+"auth/login";
export const POST_API_URL=GLOBAL_URL+"blog/post";
export const GET_BLOG_API_URL=GLOBAL_URL+"blog/getblog";
export const GET_SINGLE_BLOG_API_URL=GLOBAL_URL+"blog/getblog/"
export const DELETE_BLOG_BY_ID=GLOBAL_URL+"blog/deleteblog/"
export const UPDATE_BLOG_BY_ID=GLOBAL_URL+"blog/updateblog/"
export const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link','image'],
      ['clean']
    ],
  }

 export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];