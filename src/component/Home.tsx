import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      {/* CONTENEUR UNIQUE */}
      <div className="relative w-full max-w-4xl h-[360px] flex items-center justify-center">

        {/* Image coin bas droit */}
        <img
          src="/tomatoes.png"
          alt=""
          className="absolute bottom-0 right-0 w-37 h-28 z-50"
        />

        {/* DROP ZONE CENTRÉE */}
        <motion.div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          whileHover={{ scale: 1.01 }}
          className="
            w-[90%] h-[300px]
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
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          ) : (
            <>
              {/* Gradient SVG */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="camera-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#499DDB" />
                  </linearGradient>
                </defs>
              </svg>

              <Camera size={70} stroke="url(#camera-gradient)" />

              <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB] mt-3">
                Glissez une image ici
              </p>

              <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB] mb-4">
                ou cliquez pour importer / utiliser la caméra
              </p>

              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#4CAF50] to-[#499DDB] text-white"
              >
                Importer
              </button>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
