import React, { useRef } from "react";

interface RebuildCounterProps {
descriptor: string; 
}

const RebuildCounter: React.FC<RebuildCounterProps> = ({descriptor}) => {
  const countRef = useRef(0);
  countRef.current += 1;
  return <span>{descriptor} renders: {countRef.current}</span>;
};

export default RebuildCounter;