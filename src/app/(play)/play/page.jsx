"use client";
/* ----- Third Party Imports ----- */
import { useEffect, useRef } from "react";

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";
import Keyboard from "@/components/Keyboard";
import Display from "@/components/Display";
import ResultModal from "@/components/ResultModal";

export default function PlayPage() {
  const { startNewGame } = useGameContext();
  const smartUseEffect = useRef(false);
  useEffect(() => {
    if (!smartUseEffect.current) {
      startNewGame();
    }
    return () => (smartUseEffect.current = true);
  }, [startNewGame]);

  return (
    <div>
      <Display />
      <ResultModal />
      <Keyboard />
    </div>
  );
}
