import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import {useCreatePost} from '../hooks/useCreatePost'
const CreatePost = () => {
    const [title,setTitele] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const {createPost} = useCreatePost();
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

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const data = new FormData()
         data.set('title',title)
         data.set('summary',summary)
         data.set('content',content)
         data.set('cover',files[0])
    
      await createPost(data)
    }
    return ( 
        <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">
            <input type="text" name="" id="" placeholder="title" value={title} onChange={e=>setTitele( e.target.value)}/>
            <input type="text" placeholder="summary"  value={summary} onChange={e=>setSummary(e.target.value)} />
            <input type="file" name="cover" id="" onChange={e=>setFiles(e.target.files)} multiple />
            <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={e=>setContent(e)}/>
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
     );
}
 
export default CreatePost;