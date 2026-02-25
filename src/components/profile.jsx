import { useContext } from "react"
import { SelfPostsContext, ServerStatusContext, SessionContext } from "../App";
import { useNavigate } from "react-router";

import user from "../assets/images/user-4254_256.png";

import './styles/profile.css';
import './styles/load.css';
import ErrorPage from "./error/serverDown";
import Loader from "./loader";

export const Profile = () => {
    const username = useContext(SessionContext).username || localStorage.getItem("username");
    const posts = useContext(SelfPostsContext).posts;

    return (
        <div>
            <div className="user-profile-wrapper">
                <div className="upper user-profile-overview">
                    <div className="username-avatar">
                        <div>
                            <picture>
                                <source srcSet={user + " 30w"}/>
                                <img src={user} width={320} height={320} alt="user-image" />
                            </picture>
                        </div>
                        <div><div>{username}</div></div>
                    </div>
                    <div className="published-container">
                        <span className="span-published-styled">Published</span>
                        <p>{posts.length || 0 }</p>
                    </div>
                </div>
            </div>
            <div></div>
            <div className="decorator-posts">
                <Posts posts={posts}/>
            </div>
        </div>
    )
}

async function publishOrUnpublish(value, postid) {
    const body = JSON.stringify({ published: value });
    const token = localStorage.getItem("Token");
    const options = {
        mode: "cors",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body
    }
    const result = await fetch(`http://localhost:5000/posts/publish/${postid}`, options);
    if(!result.ok) {
        console.error(result.error);
        return false;
    }
    else true;
}

const togglePublish = (target) => {
    const classList = target.classList;
    classList.toggle("published");
    return;
}

const Posts = ({posts = []}) => {
    const navigate = useNavigate();
    const serverStatus = useContext(ServerStatusContext);

    //toggle publish
    function handleClick(e) {

        const id = e.target.classList[0];
        const postContainer = document.querySelector(`.post${id}.post-container`);
        togglePublish(postContainer);

        const postid = parseInt(id);
        [...postContainer.classList].includes("published") ? publishOrUnpublish(true, postid) : publishOrUnpublish(false, postid);
    
    }

    //open blog post
    function openContent(e) {
        const target = document.querySelector(".publish-button button");
        const clicked = e.target;
        if(clicked !== target) {
            const postid = parseInt(e.currentTarget.getAttribute("data-postid"));
            //TODO- send post data through state option on navigate
            // const state = {} 
            return (
                navigate(`./posts/${postid}`)
            )
        }
    }

    return (
        <div className="all-posts-wrapper-styled">
            <div className="header-styled-posts">POSTS</div>
            <div className="selfposts-container all-posts">
                {
                    posts !== false && posts.length >0 ? posts.map((post) => {
                        const published = post.published ? 'published' : '';

                        const classname = `post${post.id} post-container ${published}`;

                        return (

                            <div 
                                className={classname} 
                                data-postid={post.id} 
                                key={post.id}
                                onClick={openContent}
                                style={{ minHeight: "330px", width: "380px" }}
                            >
                                <div className="profile blog-picture post-upper-portion">
                                    <picture>pic</picture>
                                </div>
                                <div className="post-lower-portion">
                                    <div className="post-title">
                                        <h3>{post.title}</h3>
                                    </div>
                                    <div className="post-created-at">
                                        <div>{post.createdAt}</div>
                                    </div>
                                    <div className="publish-button">
                                        <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClick(e);
                                            const target = e.target;
                                            target.textContent = target.textContent === "publish" ? "unpublish" : "publish";
                                            togglePublish(target);
                                        }}
                                        className={post.id + " button-styled" + " " + published}
                                        >
                                            {published ? 'unpublish' : 'publish'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : posts === false 
                        ? <p className="no-posts-styled">No posts..</p>
                        : serverStatus === false 
                        ? <ErrorPage />
                        : <Loader />
                }
            </div>
        </div>
    )
}