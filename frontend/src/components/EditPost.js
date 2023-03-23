import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import {useCreatePost} from '../hooks/useCreatePost'
const EditPost = () => {
  const {user} = useAuthContext()
  const {id} = useParams()
   const navigate = useNavigate()
    const [title,setTitele] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const {updatePost} = useCreatePost();
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    const   formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
useEffect(()=>{
  axios.get('http://localhost:5555/api/blog-post/posts/'+id,
  {
    headers:{
      'Authorization':   `Bearer ${user.token}`
    }
  }
  ).then(r=>{
    console.log(r.data);
    const responce = r.data
    setTitele(responce.title)
    setSummary(responce.summary)
    setContent(responce.content)
  })
  .catch(e=>{console.log(e.message)})
},[id,user])

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const data = new FormData()
         data.set('title',title)
         data.set('summary',summary)
         data.set('content',content)
         data.set('cover',files[0])
    
      await updatePost(data,id)
      navigate('/')
     
    }
    return ( 
        <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">
            <input type="text" name="" id="" placeholder={`title`} is value={title} onChange={e=>setTitele( e.target.value)}/>
            <input type="text" placeholder={"summary"}  value={summary} onChange={e=>setSummary(e.target.value)} />
            <input type="file" placeholder="temporarly you can't update cover we will fixing it" name="cover" id="" onChange={e=>setFiles(e.target.files)} multiple />
            <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={e=>setContent(e)}/>
            <button style={{marginTop:'5px'}}>Update Post</button>
        </form>
     );
}
 
export default EditPost;