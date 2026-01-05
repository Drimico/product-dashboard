import { useState } from "react";

export const useRadial = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const x = e.pageX - card.offsetLeft;
    const y = e.pageY - card.offsetTop;
    setPosition({ x, y });
  };
  return { position, handleMouseMove };
};
