import { cx } from "@/lib/utils";
import Image from "next/image";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.jpeg"
      alt="Complexe Scolaire Bilingue Thomas D'Acquin"
      width={56}
      height={56}
      className={cx("h-14 w-14", className)}
    />
  );
}
