import { useState, useRef, useEffect } from "react";

export function usePolygonList() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showArrow, setShowArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      setShowArrow(el.scrollTop < 4);
    };
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return {
    deletingId,
    setDeletingId,
    showArrow,
    scrollRef,
  };
}
