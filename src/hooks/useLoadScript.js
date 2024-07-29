import { useState, useEffect } from "react";

const useLoadScript = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return isLoaded;
};

export default useLoadScript;
