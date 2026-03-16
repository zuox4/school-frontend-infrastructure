// components/BackButton.jsx
import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

const BackButton = ({ text = "", color = "#e0e0e0", size = 16, ...props }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
        border: "none",
        background: "none",
        color: color,
        fontSize: size,
        WebkitTapHighlightColor: "transparent",
        outline: "none",
        userSelect: "none",
      }}
      {...props}
    >
      <ArrowLeft size={size + 4} />
      {text}
    </div>
  );
};

export default BackButton;
