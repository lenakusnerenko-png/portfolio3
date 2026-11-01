/**
 * ============================================================
 *  SECRET VAULT — central configuration
 * ============================================================
 *  Change anything here without touching the game logic.
 *  - AFFILIATE_LINK  : destination URL for the "CLAIM" button
 *  - texts           : all on-screen copy
 *  - vaults          : the 3 vaults and their prizes
 *  - trust           : trust-building stats and badges
 * ============================================================
 */

export type PrizeType = "cash" | "percent";
export type VaultDef = {
  id: number;
  name: string;
  amount: number;
  type: PrizeType; // cash = $, percent = % deposit bonus
};

export const config = {
  // ⬇️ Replace this with your affiliate / partner link
  AFFILIATE_LINK: "https://bc-game-casino.cfd/",

  // The three vaults. The user always wins the $50 one.
  vaults: [
    { id: 0, name: "Vault 1", amount: 25, type: "cash" },
    { id: 1, name: "Vault 2", amount: 50, type: "cash" },
    { id: 2, name: "Vault 3", amount: 500, type: "percent" },
  ] as VaultDef[],

  // The vault the player always wins (index into vaults array)
  winningVaultIndex: 1,

  // Trust stats shown on the landing page
  trust: {
    playersOnline: "247",
    totalPaidOut: "$86.4K",
    rating: "4.8",
    ratingCount: "2.1K",
  },

  texts: {
    // Landing screen
    topBadge: "EXCLUSIVE PROMO",
    headline: "UNLOCK YOUR",
    headlineAccent: "EXCLUSIVE BONUS",
    subheadline: "Three secret vaults. One choice. Pick yours and claim your reward instantly.",
    openVaultButton: "OPEN THE VAULTS",

    // Vault selection (now integrated into landing)
    vaultSelectTitle: "CHOOSE A VAULT",
    vaultSelectSubtitle: "Three secret vaults. Pick one and see what's inside.",

    // Opening animation
    openingTitle: "UNLOCKING...",
    openingSubtitle: "Your vault is opening...",

    // Reward screen
    congratsTitle: "CONGRATULATIONS!",
    congratsBody: "You opened the secret vault!",
    bonusLabel: "Your $50 bonus is waiting to be activated.",
    claimButton: "GET $50",
    playAgain: "Play again",
    disclaimer:
      "This is a promotional bonus offer. Bonus must be activated to be claimed. Full terms available after clicking the button above.",
  },
};

/** Format a vault prize for display: $25, $50, or 500% */
export function formatPrize(v: VaultDef): string {
  return v.type === "cash" ? `$${v.amount}` : `${v.amount}%`;
}
