import fetch from "node-fetch";

export default async function getLocation(req) {
  let ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  // Detectar IP local
  if (
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("::ffff:192.") ||
    ip === "::ffff:127.0.0.1"
  ) {
    // IP pública de prueba en desarrollo, ya que es imposible obtener mi IP publica en desarrollo
    ip = "8.8.8.8";
  }

  try {
    // Obtengo la IP del usuario
    const geoRes = await fetch(`https://ipwhois.app/json/${ip}`);
    const geoData = await geoRes.json();

    if (geoData.success === false) {
      console.error("Error en API ipwhois:", geoData.message);
    }

    const country = geoData.country;
    const city = geoData.city;

    return { country, city };
  } catch (error) {
    console.error("Error obteniendo ubicación:", error);
  }
}
