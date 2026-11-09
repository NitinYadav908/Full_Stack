import React from "react";

function CharacterCounter({ text, selectedPlatforms }) {

    return (

        <div className="counter-box">

            <h3>Character Counter</h3>

            {selectedPlatforms.length === 0 ? (

                <p>Select at least one platform.</p>

            ) : (

                selectedPlatforms.map((platform) => {

                    let limit = 0;

                    switch (platform) {

                        case "twitter":
                            limit = 280;
                            break;

                        case "facebook":
                            limit = 63206;
                            break;

                        case "instagram":
                            limit = 2200;
                            break;

                        case "linkedin":
                            limit = 3000;
                            break;

                        default:
                            limit = 0;

                    }

                    const remaining = limit - text.length;

                    return (

                        <div key={platform}>

                            <strong>{platform.toUpperCase()}</strong>

                            <p
                                style={{
                                    color:
                                        remaining < 0
                                            ? "red"
                                            : remaining < 20
                                            ? "orange"
                                            : "green",
                                }}
                            >
                                {text.length} / {limit}
                            </p>

                        </div>

                    );

                })

            )}

        </div>

    );
}

export default CharacterCounter;