import { Shield, Users, Star, Lock } from "lucide-react";
import { config } from "@/config";

/**
 * Trust bar shown on the landing and reward screens: live player count,
 * total paid out, star rating, and security/provably-fair badges.
 */
export default function TrustBar({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge icon={<Shield className="h-4 w-4" />} label="Provably Fair" />
        <Badge icon={<Lock className="h-4 w-4" />} label="SSL Secured" />
        <Badge
          icon={<Star className="h-4 w-4 fill-vault-lime text-vault-lime" />}
          label={`${config.trust.rating}/5`}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Stat
          icon={<Users className="h-5 w-5" />}
          value={config.trust.playersOnline}
          label="Players Online"
        />
        <Stat
          icon={<Star className="h-5 w-5 fill-vault-lime text-vault-lime" />}
          value={config.trust.rating}
          label={`${config.trust.ratingCount} Reviews`}
        />
        <Stat
          icon={<Shield className="h-5 w-5" />}
          value={config.trust.totalPaidOut}
          label="Total Paid Out"
        />
      </div>

      {/* Badges row */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Badge icon={<Shield className="h-4 w-4" />} label="Provably Fair" />
        <Badge icon={<Lock className="h-4 w-4" />} label="SSL Encrypted" />
        <Badge icon={<Star className="h-4 w-4" />} label="Licensed Platform" />
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="trust-pill rounded-xl px-2 py-3 text-center">
      <div className="flex items-center justify-center text-vault-lime">
        {icon}
      </div>
      <p className="mt-1 font-display text-lg tracking-wide text-vault-limeBright sm:text-xl">
        {value}
      </p>
      <p className="text-[10px] tracking-wide text-vault-lime/50 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="trust-pill flex items-center gap-1.5 rounded-full px-3 py-1.5">
      <span className="text-vault-lime">{icon}</span>
      <span className="text-xs font-medium tracking-wide text-vault-lime/70">
        {label}
      </span>
    </div>
  );
}
