import { IconButton, Panel } from "@maxhub/max-ui";
import { CircleX } from "lucide-react";
import type React from "react";
import { useEffect, useState, useRef } from "react";

type ModalProps = {
  component: React.ReactNode;
  closeModal: () => void;
};

export default function ModalFromBottom({ component, closeModal }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(closeModal, 300);
  };

  return (
    <Panel
      style={{
        width: "100%",
        height: "100vh",
        background: isVisible ? "rgba(17, 17, 17, 0.5)" : "transparent",
        backdropFilter: isVisible ? "blur(8px)" : "none",
        WebkitBackdropFilter: isVisible ? "blur(8px)" : "none",
        position: "fixed",
        top: "0",
        left: "0",
        padding: "0px 10px",
        paddingBottom: "0px",
        zIndex: "100",
        display: "flex",
        flexDirection: "column-reverse",
        transition:
          "background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out",
        pointerEvents: isVisible && !isClosing ? "auto" : "none",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <Panel
        style={{
          background: "rgba(2, 24, 49, 0.28)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          height: "fit-content",
          padding: "10px",
          paddingBottom: "50px",
          paddingTop: "20px",
          borderRadius: "20px 20px 0px 0px",
          position: "relative",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "50%",
            transition: "all 0.2s ease",
          }}
          appearance="neutral"
          aria-label="Закрыть"
          mode="link"
          size="small"
          onClick={handleClose}
        >
          <CircleX color="rgba(255, 255, 255, 0.9)" size={18} />
        </IconButton>
        {component}
      </Panel>
    </Panel>
  );
}
