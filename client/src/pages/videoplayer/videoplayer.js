import { useEffect, useState, useRef } from "react";
import './videoplayer.css';

function Gallery() {
  const [images, setImages] = useState([
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-sxKGGVvG0iUKeaWlUJCBINxH.png?st=2024-03-31T13%3A35%3A43Z&se=2024-03-31T15%3A35%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A07%3A27Z&ske=2024-04-01T00%3A07%3A27Z&sks=b&skv=2021-08-06&sig=79RpuaegfKUntu/bc9iN/bFzLBnwjxOe/4GuVYSrOLw%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-Vf0MaMha1bXom7Sdhqd8ROry.png?st=2024-03-31T13%3A36%3A01Z&se=2024-03-31T15%3A36%3A01Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-30T22%3A53%3A02Z&ske=2024-03-31T22%3A53%3A02Z&sks=b&skv=2021-08-06&sig=1ab8mAU3W8VOvCiaSL4A/5KhOwMv8ytTzPUn4EbYUT0%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-rOm6e2euv1AXdsdSFiYwvx1a.png?st=2024-03-31T13%3A36%3A14Z&se=2024-03-31T15%3A36%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A31%3A46Z&ske=2024-04-01T00%3A31%3A46Z&sks=b&skv=2021-08-06&sig=a%2BjVda6r254/0QZS4ibWdhmUbWiKbVIgv4W/SSa1pvY%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-FnsqvCQVaH61PGrpquxNrZMV.png?st=2024-03-31T13%3A36%3A28Z&se=2024-03-31T15%3A36%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A50%3A11Z&ske=2024-04-01T00%3A50%3A11Z&sks=b&skv=2021-08-06&sig=/tyOSIDGZLURHL6GGdaCSGEm4jNilq8sK3Dy5XW1L54%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-lXyXDeuInuG0i9c01MkF5QnA.png?st=2024-03-31T13%3A36%3A41Z&se=2024-03-31T15%3A36%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T01%3A00%3A32Z&ske=2024-04-01T01%3A00%3A32Z&sks=b&skv=2021-08-06&sig=523aVUt15jv/DcRf033wyIyt440k2F4XBTU83Ny/gr0%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-7seCnmwGSm4WNspfBGg1vV0v.png?st=2024-03-31T13%3A36%3A55Z&se=2024-03-31T15%3A36%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A20%3A07Z&ske=2024-04-01T00%3A20%3A07Z&sks=b&skv=2021-08-06&sig=NOpIcABkVkdPZW6qgWPQqCaHxObDuEkErzwodNgJVjw%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-lUmVt1zwGh2GOG5RJkq04Qcz.png?st=2024-03-31T13%3A37%3A10Z&se=2024-03-31T15%3A37%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A28%3A23Z&ske=2024-04-01T00%3A28%3A23Z&sks=b&skv=2021-08-06&sig=PmQHavjq1lAIc%2BXdUa//ctHmpXkG4xPIIZ6oXOW4awE%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-pP8JkhiuvtGYnF1I3eEtCMDX.png?st=2024-03-31T13%3A37%3A27Z&se=2024-03-31T15%3A37%3A27Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A15%3A26Z&ske=2024-04-01T00%3A15%3A26Z&sks=b&skv=2021-08-06&sig=fIK09yjtZPtf1iZJwsprR7Q44OzC1AlnVgmneVvKP5E%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-NB76gstdvR1LsELhGt1ZMNsj.png?st=2024-03-31T13%3A37%3A46Z&se=2024-03-31T15%3A37%3A46Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A25%3A17Z&ske=2024-04-01T00%3A25%3A17Z&sks=b&skv=2021-08-06&sig=FibIpxKcsldBSPmXpDjmNb5iHEsidmMIswaVeLx/8rA%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jonizfKc4vcTtkCzuDghtEPU/user-uvmBF0yZszYexevqgP2CMfaG/img-36uwAsgrjS8NIiPE43rTwLDb.png?st=2024-03-31T13%3A38%3A00Z&se=2024-03-31T15%3A38%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-31T00%3A17%3A32Z&ske=2024-04-01T00%3A17%3A32Z&sks=b&skv=2021-08-06&sig=w5dNQxtfsiIF1BqcMrMkS%2B7QXNsyLMxPx4Frha6AWSc%3D"
]);
  const [audioFiles, setAudioFiles] = useState([
    "https://audio.jukehost.co.uk/CpIJHXGe8kFrF0pbp0g7oWN8XdrCEl9B", 
    "https://audio.jukehost.co.uk/p5ZV3XFpy2tzuilPu6QTKG5wMhJxu7bG",
    "https://audio.jukehost.co.uk/5yvNOo3UvNOMErZRsSsuGbZ6eDXJXAyG",
    "https://audio.jukehost.co.uk/yOxyNC9IWiUDUnbrh0AaHk7clVjiXqL0",
    "https://audio.jukehost.co.uk/TxmIyYj02Q6w9f7zojHnt3NDpMA2WbYP",
    "https://audio.jukehost.co.uk/TDmZnv5A2QewGEOvb96biLHdfHDj0bSV",
    "https://audio.jukehost.co.uk/TBpkXbLiGy3rWh8pNDpUK26OeuvyNFTS",
    "https://audio.jukehost.co.uk/p0lZskaFWDTwX73MF2LSWmY7hdqGRpLP",
    "https://audio.jukehost.co.uk/A8kTFYSydLcx7WSEzWdRp5xmIUaEtniY",
    "https://audio.jukehost.co.uk/KCy9669ZrZKqoWWk6BDEVsAwsFukKOvg",
    "https://audio.jukehost.co.uk/PueNxxKtwkBmYBloAPlcVXdu6LQ0g9OU"

  ]);
  const [audioIndex, setAudioIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = images[audioIndex]; // Use audioIndex to sync images with audio
    image.onload = () => {
      const maxWidth = 1000; 
      const maxHeight = 800; 
      const ratio = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
      const scaledWidth = image.naturalWidth * ratio;
      const scaledHeight = image.naturalHeight * ratio;

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
    };
  }, [audioIndex, images]); // Depend on audioIndex

  useEffect(() => {
    if (!isStarted) return;

    const audio = audioRef.current;
    audio.src = audioFiles[audioIndex];
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        audio.addEventListener('ended', () => {
          setAudioIndex((currentAudioIndex) => (currentAudioIndex + 1) % audioFiles.length);
        });
      })
      .catch((error) => console.log("Audio play failed", error));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('ended', () => {});
    };
  }, [audioIndex, audioFiles.length, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div className="gallery">
      {!isStarted && <button onClick={handleStart} type="submit">Start</button>}
      <canvas ref={canvasRef} width="1000" height="800"></canvas>
    </div>
  );
}

export default Gallery;