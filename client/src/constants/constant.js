
export const GLOBAL_URL='http://localhost:4000/api/';
export const IMG_URL='http://localhost:4000/';
export const REGISTER_API_URL=GLOBAL_URL+"signup";
export const LOGIN_API_URL=GLOBAL_URL+"login";
export const POST_API_URL=GLOBAL_URL+"blog/post";
export const GET_BLOG_API_URL=GLOBAL_URL+"blog/getblog";
export const GET_SINGLE_BLOG_API_URL=GLOBAL_URL+"blog/getblog/"

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