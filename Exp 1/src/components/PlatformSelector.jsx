import React from "react";
import platforms from "../platforms";

function PlatformSelector({ selectedPlatforms, setSelectedPlatforms }) {

    const handleChange = (platform) => {

        if (selectedPlatforms.includes(platform)) {

            setSelectedPlatforms(
                selectedPlatforms.filter((p) => p !== platform)
            );

        } else {

            setSelectedPlatforms([...selectedPlatforms, platform]);

        }

    };

    return (

        <div className="platform-selector">

            <h3>Select Platforms</h3>

            <div className="platform-grid">

                {Object.keys(platforms).map((platform) => (

                    <label key={platform} className="platform-card">

                        <input
                            type="checkbox"
                            checked={selectedPlatforms.includes(platform)}
                            onChange={() => handleChange(platform)}
                        />

                        <span>{platforms[platform].name}</span>

                    </label>

                ))}

            </div>

        </div>

    );
}

export default PlatformSelector;