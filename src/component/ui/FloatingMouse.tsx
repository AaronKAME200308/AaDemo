import { motion, useMotionValue, useSpring } from "framer-motion";

const FloatingImage = ({ src, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) / 15;
    const offsetY = (e.clientY - rect.top - rect.height / 2) / 15;

    x.set(offsetX);
    y.set(offsetY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="absolute inset-0 pointer-events-none"
    >
      <motion.img
        src={src}
        className={className}
        style={{ x: springX, y: springY }}
      />
    </motion.div>
  );
};

export default FloatingImage;
