import { useSelector } from "react-redux";

function PlatformSelector({ value, onChange }) {
  const platforms = useSelector((state) => state.platforms);

  return (
    <div className="platform-selector">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          type="button"
          className={value === platform.id ? "platform active" : "platform"}
          onClick={() => onChange(platform.id)}
        >
          <span>{platform.icon}</span>
          {platform.name}
        </button>
      ))}
    </div>
  );
}

export default PlatformSelector;