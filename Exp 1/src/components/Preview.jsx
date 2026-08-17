import React from "react";

function Preview({ text, image }) {

    return (

        <div className="preview">

            <h3>Live Preview</h3>

            <div className="preview-card">

                <p>

                    {text || "Your post preview will appear here..."}

                </p>

                {image && (

                    <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                    />

                )}

            </div>

        </div>

    );

}

export default Preview;