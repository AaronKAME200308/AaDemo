import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const Home = () => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        className="          
          w-full max-w-3xl h-[420px]
          flex flex-col items-center justify-center
          cursor-pointer
          rounded-2xl
          bg-gray-500/20
          backdrop-blur-xl
          border-2 border-dashed border-gray-300/60
          shadow-xl
          transition
          hover:bg-gray-500/30
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        ) : (
          <>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="camera-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CAF50" />
                  <stop offset="100%" stopColor="#499DDB" />
                </linearGradient>
              </defs>
            </svg>

            <Camera
              size={70}
              stroke="url(#camera-gradient)"
              strokeWidth={2}
            />

            <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB] mb-2">
              Glissez une image ici
            </p>
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB] mb-4">
              ou cliquez pour importer / utiliser la caméra
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#4CAF50] to-[#499DDB] text-white"
              >
                Importer
              </button>
            </div>
          </>
        )}

        {/* Input caché */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleChange}
        />
      </motion.div>
    </main>
  );
};

export default Home;
