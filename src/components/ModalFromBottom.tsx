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
        background: isVisible ? "#11111173" : "transparent",
        position: "fixed",
        top: "0",
        left: "0",
        padding: "0px 10px ",
        paddingBottom: "0px",
        zIndex: "100",
        display: "flex",
        flexDirection: "column-reverse",
        transition: "background-color 0.3s ease-in-out",
        pointerEvents: isVisible && !isClosing ? "auto" : "none",
      }}
      onClick={(e) => {
        // Закрываем только при клике на оверлей (самый внешний Panel)
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <Panel
        style={{
          background: "#242424",
          height: "fit-content",
          padding: "20px",
          paddingBottom: "50px",
          // border: "solid 1px #309718",
          paddingTop: "20px",
          borderRadius: "20px 20px 0px 0px",
          position: "relative",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
        onClick={(e) => e.stopPropagation()} // 👈 ОСТАНАВЛИВАЕМ ВСПЛЫТИЕ
      >
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          appearance="neutral"
          aria-label="Закрыть"
          mode="link"
          size="small"
          onClick={handleClose}
        >
          <CircleX />
        </IconButton>
        {component}
      </Panel>
    </Panel>
  );
}
