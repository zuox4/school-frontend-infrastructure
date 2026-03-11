// import { Button, Panel, Flex, Typography } from "@maxhub/max-ui";
// import { Camera, X, FlipHorizontal, StopCircle } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import jsQR from "jsqr";

// type QRScannerProps = {
//   onScan: (data: string) => void;
//   onClose?: () => void;
//   isOpen?: boolean;
// };

// export function QRScanner({ onScan, onClose, isOpen = true }: QRScannerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [facingMode, setFacingMode] = useState<"user" | "environment">(
//     "environment",
//   );
//   const streamRef = useRef<MediaStream | null>(null);

//   // Запуск камеры
//   const startCamera = async () => {
//     try {
//       setError("");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: facingMode },
//         audio: false,
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//         setHasPermission(true);
//         setIsScanning(true);
//       }
//     } catch (err) {
//       console.error("Ошибка доступа к камере:", err);
//       setError("Не удалось получить доступ к камере");
//       setHasPermission(false);
//     }
//   };

//   // Остановка камеры
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setIsScanning(false);
//   };

//   // Переключение камеры
//   const toggleCamera = () => {
//     stopCamera();
//     setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
//   };

//   // Закрытие сканера
//   const handleClose = () => {
//     stopCamera();
//     onClose?.();
//   };

//   // Запуск сканирования при монтировании
//   useEffect(() => {
//     if (isOpen) {
//       startCamera();
//     }

//     return () => {
//       stopCamera();
//     };
//   }, [isOpen, facingMode]);

//   // Сканирование QR-кода
//   useEffect(() => {
//     if (!isScanning || !videoRef.current || !canvasRef.current) return;

//     const scanInterval = setInterval(() => {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA)
//         return;

//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       // Настраиваем canvas под размер видео
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       // Рисуем кадр на canvas
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Получаем данные пикселей
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       // Ищем QR-код
//       const code = jsQR(imageData.data, imageData.width, imageData.height, {
//         inversionAttempts: "dontInvert",
//       });

//       if (code) {
//         // Нашли QR-код
//         setIsScanning(false);
//         stopCamera();
//         onScan(code.data);
//       }
//     }, 500); // Сканируем каждые 500мс

//     return () => clearInterval(scanInterval);
//   }, [isScanning, onScan]);

//   if (!isOpen) return null;

//   return (
//     <Panel
//       style={{
//         zIndex: 1000,
//         display: "flex",
//         flexDirection: "column",
//         height: "300px",
//         borderRadius: "10px",

//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Шапка с кнопкой закрытия */}

//       {/* Видео */}
//       <div
//         style={{
//           flex: 1,
//           position: "relative",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "#000",
//         }}
//       >
//         {hasPermission === false && (
//           <div style={{ textAlign: "center", color: "white", padding: "20px" }}>
//             <Camera size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
//             <Typography.Label style={{ color: "white" }}>
//               {error || "Нет доступа к камере"}
//             </Typography.Label>
//             <Button onClick={handleClose} style={{ marginTop: "16px" }}>
//               Закрыть
//             </Button>
//           </div>
//         )}

//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             transform: facingMode === "user" ? "scaleX(-1)" : "none",
//           }}
//         />

//         {/* Рамка для сканирования */}
//         {isScanning && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "200px",
//               height: "200px",
//               border: "2px solid rgba(255,255,255,0.5)",
//               borderRadius: "20px",
//               boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
//               pointerEvents: "none",
//             }}
//           >
//             {/* Уголки */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: -2,
//                 left: -2,
//                 width: "30px",
//                 height: "30px",
//                 borderTop: "4px solid #00ff00",
//                 borderLeft: "4px solid #00ff00",
//                 borderRadius: "10px 0 0 0",
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 top: -2,
//                 right: -2,
//                 width: "30px",
//                 height: "30px",
//                 borderTop: "4px solid #00ff00",
//                 borderRight: "4px solid #00ff00",
//                 borderRadius: "0 10px 0 0",
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: -2,
//                 left: -2,
//                 width: "30px",
//                 height: "30px",
//                 borderBottom: "4px solid #00ff00",
//                 borderLeft: "4px solid #00ff00",
//                 borderRadius: "0 0 0 10px",
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: -2,
//                 right: -2,
//                 width: "30px",
//                 height: "30px",
//                 borderBottom: "4px solid #00ff00",
//                 borderRight: "4px solid #00ff00",
//                 borderRadius: "0 0 10px 0",
//               }}
//             />
//           </div>
//         )}

//         {/* Анимация сканирования */}
//         {isScanning && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "190px",
//               height: "2px",
//               background:
//                 "linear-gradient(90deg, transparent, #00ff00, transparent)",
//               animation: "scan 2s linear infinite",
//               pointerEvents: "none",
//             }}
//           />
//         )}
//       </div>

//       {/* Нижняя панель с кнопками */}
//       <Flex
//         justify="center"
//         gap={10}
//         style={{
//           padding: "16px",

//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           zIndex: 10,
//         }}
//       >
//         {isScanning && (
//           <div>
//             <Button
//               onClick={handleClose}
//               style={{
//                 flex: 1,
//               }}
//             >
//               <StopCircle size={20} style={{}} />
//             </Button>
//           </div>
//         )}
//       </Flex>

//       {/* Стили для анимации */}
//       <style>
//         {`
//           @keyframes scan {
//             0% { top: 30%; }
//             50% { top: 70%; }
//             100% { top: 30%; }
//           }
//         `}
//       </style>

//       {/* Скрытый canvas для обработки */}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </Panel>
//   );
// }

// export default function SimpleQRCode() {
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [scannedResult, setScannedResult] = useState<string>("");

//   return (
//     <div
//       style={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "16px",
//       }}
//     >
//       <Button onClick={() => setIsScannerOpen(true)}>
//         Отсканировать QR-код
//       </Button>

//       {scannedResult && (
//         <div
//           style={{
//             padding: "16px",
//             background: "#f0f0f0",
//             borderRadius: "8px",
//             wordBreak: "break-all",
//           }}
//         >
//           <strong>Результат:</strong> {scannedResult}
//         </div>
//       )}

//       <QRScanner
//         isOpen={isScannerOpen}
//         onScan={(data) => {
//           setScannedResult(data);
//           setIsScannerOpen(false);
//         }}
//         onClose={() => setIsScannerOpen(false)}
//       />
//     </div>
//   );
// }
