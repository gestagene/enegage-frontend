import { useEffect, useRef, useState } from "react";
import type { vote } from "@/types/post";

function voteWeight(v: vote | null): number {
  if (v === "up") return 1;
  if (v === "down") return -1;
  return 0;
}

type VoteFunction = (vote: vote | null) => Promise<unknown>;

export function useVote(
  voteFn: VoteFunction,
  initialVote: vote | null = null,
  initialScore: number = 0,
) {
  const [vote, setVote] = useState<vote | null>(initialVote);
  const [voteScore, setVoteScore] = useState(initialScore);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleVote = (newVote: vote) => {
    const prevVote = vote;
    const nextVote = prevVote === newVote ? null : newVote;
    const delta = voteWeight(nextVote) - voteWeight(prevVote);

    setVote(nextVote);
    setVoteScore((score) => score + delta);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      voteFn(nextVote).catch(() => {
        // request failed — roll back both the icon state and the count
        setVote(prevVote);
        setVoteScore((score) => score - delta);
      });
    }, 500);
  };

  return {
    vote,
    voteScore,
    handleVote,
  };
}
