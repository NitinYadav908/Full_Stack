import React, { useState } from "react";
import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import Preview from "./Preview";
import platforms from "../platforms";
import "../styles/Composer.css";

function PostComposer() {
  const [text, setText] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [image, setImage] = useState(null);

  const hashtagCount = (text.match(/#\w+/g) || []).length;

  const validatePlatform = (platformKey) => {
    const platform = platforms[platformKey];

    const messages = [];

    // Character validation
    if (text.length > platform.limit) {
      messages.push(
        `❌ Character limit exceeded (${text.length}/${platform.limit})`
      );
    } else {
      messages.push(
        `✅ Character count OK (${text.length}/${platform.limit})`
      );
    }

    // Image validation
    if (platform.imageRequired && !image) {
      messages.push("❌ Image is required.");
    } else if (platform.imageRequired && image) {
      messages.push("✅ Image uploaded.");
    }

    // Hashtag validation
    if (hashtagCount > platform.maxHashtags) {
      messages.push(
        `❌ Too many hashtags (${hashtagCount}/${platform.maxHashtags})`
      );
    } else if (platform.maxHashtags !== Infinity) {
      messages.push(
        `✅ Hashtags: ${hashtagCount}/${platform.maxHashtags}`
      );
    }

    return messages;
  };

  const handlePublish = () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    alert("🎉 Post Published Successfully! (Demo)");
  };

  return (
    <div className="composer-container">

      <h1>Multi Platform Post Composer</h1>

      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />

      <div className="textarea-section">

        <label>Write Your Post</label>

        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

      </div>

      <div className="upload-section">

        <label>Upload Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

      </div>

      <CharacterCounter
        text={text}
        selectedPlatforms={selectedPlatforms}
      />

      <div className="validation-section">

        <h2>Validation Results</h2>

        {selectedPlatforms.length === 0 ? (
          <p>No platform selected.</p>
        ) : (
          selectedPlatforms.map((platform) => (
            <div
              className="validation-card"
              key={platform}
            >
              <h3>{platforms[platform].name}</h3>

              {validatePlatform(platform).map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}

            </div>
          ))
        )}

      </div>

      <Preview
        text={text}
        image={image}
      />

      <button
        className="publish-btn"
        onClick={handlePublish}
      >
        Publish Post
      </button>

    </div>
  );
}

export default PostComposer;