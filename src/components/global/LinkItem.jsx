import Link from "next/link";

export const LinkItem = ({ blok }) => {
  const url = blok.link?.cached_url || blok.link?.url || "#";
  return (
    <Link href={url} className="link-wrapper" target="_blank">
      {blok.label}
    </Link>
  );
};