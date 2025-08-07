import { motion } from "framer-motion";

function Configuration() {
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
          <p>Contenido del config...</p>
        </section>
      </motion.div>
    </div>
  );
}

export default Configuration;
