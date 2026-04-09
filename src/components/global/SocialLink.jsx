import Link from "next/link";

export const SocialLink = ({ blok }) => {
  const url = blok.link?.cached_url || blok.link?.url || "#";
  const altText = blok.icon?.alt_text || "Social Media Icon";

  return (
    <Link href={url} className="icon-wrapper" target="_blank" rel="noopener noreferrer">
      <img src={blok.icon?.filename} alt={altText} />
    </Link>
  );
};