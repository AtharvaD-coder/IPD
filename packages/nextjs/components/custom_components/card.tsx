import React, { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties; 
}

export default function Card({ children, style }: CardProps) {
  return (
    <div
      className="card "
      style={style} 
    >
      {children}
    </div>
  );
}