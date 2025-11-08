export const getApiBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (typeof window !== "undefined" &&
    window.location.hostname.includes("onrender.com")
      ? "https://eatly-backend-e3dm.onrender.com"
      : "http://localhost:5000")
  );
};
