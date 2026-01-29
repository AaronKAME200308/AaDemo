import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const Home = () => {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const subInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [subPreviews, setSubPreviews] = useState<(string | null)[]>([
    "/1.jpg",
    "/2.jpeg",
    "/3.jpeg",
  ]);

  const handleMainFile = (file: File) => {
    if (!file) return;
    setMainPreview(URL.createObjectURL(file));
  };

  const handleSubFile = (file: File, index: number) => {
    if (!file) return;
    const updated = [...subPreviews];
    updated[index] = URL.createObjectURL(file);
    setSubPreviews(updated);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl">

        {/* 3 DROPBOX SECONDAIRES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {subPreviews.map((preview, index) => (
            <motion.div
              key={index}
              onClick={() => subInputRefs[index].current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleSubFile(e.dataTransfer.files[0], index);
              }}
              whileHover={{ scale: 1.03 }}
              className="
                h-[140px]
                w-full
                flex items-center justify-center
                cursor-pointer
                rounded-xl
                bg-gray-500/20
                backdrop-blur-lg
                border border-dashed border-gray-300/60
                overflow-hidden
              "
            >
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover rounded-lg"
                />


              ) : (
                <p className="text-sm text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#499DDB]">

                </p>
              )}

              <input
                ref={subInputRefs[index]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files &&
                  handleSubFile(e.target.files[0], index)
                }
              />
            </motion.div>
          ))}
        </div>

        {/* DROPBOX PRINCIPALE */}
        <motion.div
          onClick={() => mainInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleMainFile(e.dataTransfer.files[0]);
          }}
          whileHover={{ scale: 1.01 }}
          className="
            w-full h-[280px]
            flex flex-col items-center justify-center
            cursor-pointer
            rounded-2xl
            bg-gray-500/20
            backdrop-blur-xl
            border-2 border-dashed border-gray-300/60
            shadow-xl
            mb-6
          "
        >
          {mainPreview ? (
              <img
                src={mainPreview}
                className="max-h-full object-contain rounded-xl"
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
            ref={mainInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleMainFile(e.target.files[0])
            }
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
