export const getApiUrl = (path = "") => {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    const errorMessage = "Error crítico: La variable de entorno VITE_API_URL no está definida. Asegúrate de que tu archivo .env (local) o la configuración de Azure (producción) estén correctos.";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const normalizedUrl = baseUrl.endsWith('/')
    ? baseUrl.slice(0, -1)
    : baseUrl;

  if (!path) return normalizedUrl;

  return `${normalizedUrl}/${path.replace(/^\//, '')}`;
};