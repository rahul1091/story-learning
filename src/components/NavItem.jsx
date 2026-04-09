import Link from 'next/link';
import { storyblokEditable } from "@storyblok/react/rsc";

const NavItem = ({ blok }) => {
  // Determine if the link is internal or external
  const url = blok.link.cached_url || blok.link.url;

  return (
    <div {...storyblokEditable(blok)} className="px-4 py-2">
      <Link href={url === 'home' ? '/' : `/${url}`}>
        <span className="hover:text-blue-500 cursor-pointer">
          {blok.label}
        </span>
      </Link>
    </div>
  );
};

export default NavItem;