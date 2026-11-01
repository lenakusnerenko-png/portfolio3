import { useState } from "react";
import { config } from "@/config";
import { trackEvent } from "@/lib/track";
import Embers from "@/components/Embers";
import Landing from "@/components/stages/Landing";
import VaultOpening from "@/components/stages/VaultOpening";
import Reward from "@/components/stages/Reward";

type Stage = "landing" | "opening" | "reward";

export default function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [chosenIndex, setChosenIndex] = useState(0);

  const pickVault = (i: number) => {
    void trackEvent("vault_selected", { vault: i });
    // The player always wins the $50 vault, regardless of which they picked.
    setChosenIndex(config.winningVaultIndex);
    setStage("opening");
  };

  const reveal = () => {
    void trackEvent("bonus_revealed", { amount: config.vaults[chosenIndex].amount });
    setStage("reward");
  };

  return (
    <div className="vault-bg relative min-h-screen w-full overflow-hidden">
      <Embers />

      <div className="relative z-10">
        {stage === "landing" && <Landing onPick={pickVault} />}
        {stage === "opening" && (
          <VaultOpening chosenIndex={chosenIndex} onReveal={reveal} />
        )}
        {stage === "reward" && (
          <Reward chosenIndex={chosenIndex} />
        )}
      </div>
    </div>
  );
}
