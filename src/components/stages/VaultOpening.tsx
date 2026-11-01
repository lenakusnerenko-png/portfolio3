import { useEffect, useState } from "react";
import { config, formatPrize } from "@/config";
import Vault from "@/components/Vault";

export default function VaultOpening({
  chosenIndex,
  onReveal,
}: {
  chosenIndex: number;
  onReveal: () => void;
}) {
  const [phase, setPhase] = useState<"attempt" | "opening" | "revealed">(
    "attempt"
  );

  const chosen = config.vaults[chosenIndex];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 1300);
    const t2 = setTimeout(() => setPhase("revealed"), 2700);
    const t3 = setTimeout(() => onReveal(), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onReveal]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <h2
        key={phase}
        className="font-display text-3xl tracking-widest text-gold-gradient animate-fade-in sm:text-4xl"
      >
        {phase === "revealed"
          ? `+${formatPrize(chosen)} BONUS`
          : config.texts.openingTitle}
      </h2>
      <p className="mt-3 text-sm text-vault-lime/60 animate-fade-in">
        {phase === "revealed"
          ? `Your ${chosen.name} is open!`
          : config.texts.openingSubtitle}
      </p>

      <div className="mt-10 animate-shake">
        <Vault
          attempting={phase === "attempt"}
          opening={phase === "opening" || phase === "revealed"}
          revealed={phase === "revealed"}
          prize={phase === "revealed" ? chosen.amount : undefined}
          prizeType={chosen.type}
        />
      </div>
    </div>
  );
}
