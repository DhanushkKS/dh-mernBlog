import img from './../img/raycast-untitled.png'

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img src={img} alt="blog_img" />
      </div>
      <div className="texts">
        <h2>Build a Fullstack Blog App using MERN (mongo, express, react, node)</h2>
        <p className="info">
          <a href="#" className="author">Dhanushka</a>
          <time>2023-03-03 08.00</time>
        </p>
        <p className="summary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, officia? Sequi praesentium ipsa quae iste aliquam, suscipit nihil nisi, veniam accusantium dolor, dolore corrupti voluptate nam perferendis sed illum unde!</p>
      </div>
    </div>
  );
}

export default Post;
