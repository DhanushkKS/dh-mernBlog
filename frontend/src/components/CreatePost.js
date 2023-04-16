import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCreatePost } from '../hooks/useCreatePost'
import './styles/createPost.css'
const CreatePost = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const myProp = location.state && location.state.post;
  console.log("post ", myProp);
  const [title, setTitele] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const { createPost } = useCreatePost();
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user.token === null) {
      console.log('you must be logged in');
    }
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('cover', files[0])

    await createPost(data)

    navigate('/')
  }
  useEffect(() => {
    console.log("first ", user);
    if (!user) {
      alert("you must be logged in to create a post")
    }


  }, [user])

  return (
    <>
    <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">

      <section className="create-post">
        <div className="create-post-container">
          <h2>Create Post</h2>

        
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input type="text" required  value={title} onChange={e => setTitele(e.target.value)}/>
              <span className="text">Title</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input type="text" required value={summary} onChange={e => setSummary(e.target.value)}/>
              <span className="text">summary</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
            <input type="file" name="cover" id="" onChange={e => setFiles(e.target.files)} multiple />
              <span className="text">Cover</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="col">
            <div className="inputBox textarea">
              <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={e => setContent(e)} style={{marginBottom:'10px'}} />
              <span className="text" style={{top:'0'}}>Content</span>
              <span className="line" style={{position:'relative',marginTop:'4px'}}></span>
            </div>
          </div>
          </div>
          <div className="row100">
            <div className="col">
              <input type="submit" value="Create Post" />
            </div>
          </div>
       
        </div>
      </section>
      <span className='background-circles'></span>
    </form>
      {/* ################## 
      <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">
        <input type="text" name="" id="" placeholder={`title`} is value={title} onChange={e => setTitele(e.target.value)} />
        <input type="text" placeholder={"summary"} value={summary} onChange={e => setSummary(e.target.value)} />
        <input type="file" name="cover" id="" onChange={e => setFiles(e.target.files)} multiple />

        <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={e => setContent(e)} />
        <button style={{ marginTop: '5px' }}>Create post</button>
      </form>*/}
    </>
  );
}

export default CreatePost;