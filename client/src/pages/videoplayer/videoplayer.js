import { useEffect, useState, useRef } from "react";
import './videoplayer.css';

function Gallery() {
  const [images, setImages] = useState([
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-0pR51GYuWnsS4AUgcXEieEFJ.png?st=2024-03-31T09%3A25%3A06Z&se=2024-03-31T11%3A25%3A06Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A24%3A59Z&ske=2024-04-01T00%3A24%3A59Z&sks=b&skv=2021-08-06&sig=vwt9vHsx2pUOSPpVdYFjVOnPBXmwmQQ9indOzExgw1Q%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-n0KswoaYHdtHohybVQBLp5nD.png?st=2024-03-31T09%3A25%3A25Z&se=2024-03-31T11%3A25%3A25Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A10%3A36Z&ske=2024-04-01T00%3A10%3A36Z&sks=b&skv=2021-08-06&sig=iYb69ZtGGS/STVXLYCq5wAbEn2gmqRP0uVD9hySKh1k%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-Vj46vC9XE3ZRAEWxKNVOkBKd.png?st=2024-03-31T09%3A25%3A39Z&se=2024-03-31T11%3A25%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A44%3A23Z&ske=2024-04-01T00%3A44%3A23Z&sks=b&skv=2021-08-06&sig=NWITQcgPF/impTstm461PrnOARlYBgG2qWkomni7tKw%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-4a6W7So70Qx55SQ2UL2dVlB4.png?st=2024-03-31T09%3A25%3A53Z&se=2024-03-31T11%3A25%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A07%3A34Z&ske=2024-04-01T00%3A07%3A34Z&sks=b&skv=2021-08-06&sig=xFR%2BodErKwxn4NNdmql7vsBEFieq3BcG9cJD7sjF/70%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-6ZpfYtwhvPhq1KXUQPaEvIjW.png?st=2024-03-31T09%3A26%3A06Z&se=2024-03-31T11%3A26%3A06Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T10%3A13%3A51Z&ske=2024-04-01T10%3A13%3A51Z&sks=b&skv=2021-08-06&sig=A1gAxWm9nvfakP25kFqtvD03a/kOO3CcXcDb8CBMQZ0%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-66jlQOtOX8QwTlcNGRXnpyeV.png?st=2024-03-31T09%3A26%3A22Z&se=2024-03-31T11%3A26%3A22Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A19%3A51Z&ske=2024-04-01T00%3A19%3A51Z&sks=b&skv=2021-08-06&sig=h2l8YGZzlG8MNPvYVkyECNxFcKBDtq7ijtioD/RbkWk%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-8qRl5X9cNtRL1fbUj558hpwG.png?st=2024-03-31T09%3A26%3A38Z&se=2024-03-31T11%3A26%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A35%3A07Z&ske=2024-04-01T00%3A35%3A07Z&sks=b&skv=2021-08-06&sig=mO0MiKCZw8U0ou4jbbUWIAnXZEaClFfXxUIupSS1mTU%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-E54gWYWpL88diChGiqI21Rc6.png?st=2024-03-31T09%3A26%3A53Z&se=2024-03-31T11%3A26%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A06%3A40Z&ske=2024-04-01T00%3A06%3A40Z&sks=b&skv=2021-08-06&sig=eQ171vk40qNzKWOoXYOXt5pWI10Za5uPsV2w8S0WKKw%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-ib2VSHs87RzJxQeJoJe7TIEr.png?st=2024-03-31T09%3A27%3A04Z&se=2024-03-31T11%3A27%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A09%3A07Z&ske=2024-04-01T00%3A09%3A07Z&sks=b&skv=2021-08-06&sig=DEQbWIsQSkgD7ox14GA7OnRTUDOMeFLv/csn8RXbeGk%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-RxtxtN0fncn0RlW939gghW0a.png?st=2024-03-31T09%3A27%3A21Z&se=2024-03-31T11%3A27%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-30T11%3A37%3A03Z&ske=2024-03-31T11%3A37%3A03Z&sks=b&skv=2021-08-06&sig=GyH8PJoHoS0AnAdZgWg62v%2BzfS/w0Kqs8/0lyoEbrkg%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-lRYk8QyXjMEhVD4UgZVh7sXa.png?st=2024-03-31T09%3A27%3A35Z&se=2024-03-31T11%3A27%3A35Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A25%3A30Z&ske=2024-04-01T00%3A25%3A30Z&sks=b&skv=2021-08-06&sig=GhZAzJuUIIE%2ByDCjRUXMK89TDni2ylBHmgs1bBo9MoI%3D"
]);
const [audioFiles, setAudioFiles] = useState([
        "audio 0.mp3",
        "audio 1.mp3",
        "audio 2.mp3",
        "audio 3.mp3",
        "audio 4.mp3",
        "audio 5.mp3",
        "audio 6.mp3",
        "audio 7.mp3",
        "audio 8.mp3",
        "audio 9.mp3",
        "audio 10.mp3"
]);
const [audioIndex, setAudioIndex] = useState(0);
const [index, setIndex] = useState(0);
const canvasRef = useRef(null);
const audioRef = useRef(new Audio());

useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = images[index];
    image.onload = () => {
      const maxWidth = 1000; // Maximum width
      const maxHeight = 800; // Maximum height
      const ratio = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);

      const scaledWidth = image.naturalWidth * ratio;
      const scaledHeight = image.naturalHeight * ratio;

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
    };
  }, [index]); 

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = audioFiles[audioIndex]; 

    audio.play() 
      .then(() => {
        audio.addEventListener('ended', () => {
          setAudioIndex((currentAudioIndex) => (currentAudioIndex + 1) % audioFiles.length);
        });
      })
      .catch((error) => console.log("Audio play failed", error));

    return () => {
      audio.pause(); 
      audio.removeEventListener('ended', () => {});
    };
  }, [audioIndex, audioFiles.length]); 

  return (
    <div className="gallery">
      <canvas ref={canvasRef} alt={`Image ${index}`} />
    </div>
  );
}

export default Gallery;