import Image from "next/image";

/**
 * Official Living High logo (mountain mark + wordmark), sourced from
 * livinghigh.com.au. `variant` picks the colour for the background it sits on.
 */
export function Logo({
  variant = "black",
  className = "",
  priority = false,
}: {
  variant?: "black" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/logo-${variant}.png`}
      alt="Living High"
      width={1000}
      height={135}
      priority={priority}
      className={className}
    />
  );
}
