import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="overlay">
      <motion.div
        className="pageDropdown"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <section>
          <h2>Profile Page</h2>
          <p>Contenido del perfil...</p>
        </section>
      </motion.div>
    </div>
  );
}
