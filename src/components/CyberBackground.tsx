import { motion } from "framer-motion";

export const CyberBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Base Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-110"
        style={{ backgroundImage: 'url("https://storage.googleapis.com/dala-prod-public-storage/generated-images/91927efe-770f-49a2-b8b8-9f12e4e18644/cyber-bg-c6fc7665-1778880119659.webp")' }}
      />
      
      {/* Animated Gradient Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Data Nodes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-20vh"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}

      {/* Scanning Line Effect */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-10"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  );
};