import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addPost,
  deletePost,
  updatePost,
} from "./store/postsSlice";

import {
  addPlatform,
  deletePlatform,
} from "./store/platformsSlice";

import {
  addDraft,
  deleteDraft,
} from "./store/draftsSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const posts = useSelector((state) =>
    state.posts.ids.map((id) => state.posts.entities[id])
  );

  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const drafts = useSelector(
    (state) => state.drafts.drafts
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [platformName, setPlatformName] = useState("");
  const [draftText, setDraftText] = useState("");

  const clearForm = () => {
    setTitle("");
    setContent("");
    setSelectedPlatform("");
    setEditingId(null);
  };

  const handleAddPost = () => {
    if (!title || !content) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        content,
        platform: selectedPlatform,
      })
    );

    clearForm();
  };

  const handleUpdatePost = () => {
    dispatch(
      updatePost({
        id: editingId,
        changes: {
          title,
          content,
          platform: selectedPlatform,
        },
      })
    );

    clearForm();
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setSelectedPlatform(post.platform);
  };

  return (
    <div className="container">

      <h1>Redux Post Manager</h1>

      <div className="stats">
        <p>Total Posts : {posts.length}</p>
        <p>Platforms : {platforms.length}</p>
        <p>Drafts : {drafts.length}</p>
      </div>

      <h2>{editingId ? "Edit Post" : "Add Post"}</h2>

      <input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
      >
        <option value="">Select Platform</option>

        {platforms.map((platform) => (
          <option
            key={platform.id}
            value={platform.name}
          >
            {platform.name}
          </option>
        ))}
      </select>

      {editingId ? (
        <button onClick={handleUpdatePost}>
          Update Post
        </button>
      ) : (
        <button onClick={handleAddPost}>
          Add Post
        </button>
      )}

      <hr />

      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="list-item">

          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <small>{post.platform}</small>

          <br />

          <button onClick={() => handleEdit(post)}>
            Edit
          </button>

          <button
            onClick={() =>
              dispatch(deletePost(post.id))
            }
          >
            Delete
          </button>

        </div>
      ))}

      <hr />

      <h2>Platforms</h2>

      <select
  value={platformName}
  onChange={(e) => setPlatformName(e.target.value)}
>
  <option value="">Select Platform</option>
  <option value="Instagram">Instagram</option>
  <option value="Facebook">Facebook</option>
  <option value="Twitter (X)">Twitter (X)</option>
  <option value="LinkedIn">LinkedIn</option>
  
</select>

      <button
        onClick={() =>
          dispatch(
            addPlatform({
              id: Date.now(),
              name: platformName,
            })
          )
        }
      >
        Add Platform
      </button>

      {platforms.map((platform) => (
  <div key={platform.id} className="list-item">

    <span>{platform.name}</span>

    <button
      onClick={() =>
        dispatch(deletePlatform(platform.id))
      }
    >
      Delete
    </button>

  </div>

      ))}

      <hr />

      <h2>Drafts</h2>

      <textarea
        placeholder="Write Draft"
        value={draftText}
        onChange={(e) =>
          setDraftText(e.target.value)
        }
      />

      <button
  onClick={() => {
    if (!draftText.trim()) {
      alert("Please enter a draft");
      return;
    }

    dispatch(
      addDraft({
        id: Date.now(),
        text: draftText,
      })
    );

    setDraftText("");
  }}
>
  Save Draft
</button>

      {drafts.map((draft) => (
        <div key={draft.id} className="list-item">

          {draft.text}

          <button
            onClick={() =>
              dispatch(deleteDraft(draft.id))
            }
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;