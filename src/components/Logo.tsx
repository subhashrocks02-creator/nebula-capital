import { cn } from "@/lib/utils";
import LogoLight from "@/assets/logo-light.png";
import LogoDark from "@/assets/logo-dark.png"
/**
 * Nebula Capital logo lockup.
 *
 * NOTE: this is the typographic placeholder lockup. When the official logo file
 * is added to the project, swap the <LogoMark /> + wordmark for the image here
 * (single place, used by the header and footer).
 */


export function Logo({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <img
      className="w-48"
      src={tone == "light" ? LogoDark : LogoLight}
      alt="Nebula Capital"
    />
  );
}
