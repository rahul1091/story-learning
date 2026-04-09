"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/home" || pathname === "/de" || pathname === "/de/home") {
    return null;
  }
  const pathSegments = pathname.split('/').filter((item) => item !== '');
  const ArrowIcon = () => (
    <svg 
      className="mx-2 h-4 w-4 text-gray-800" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
  );

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-300">
      <div className='max-w-[1520] mx-auto py-4 px-4 lg:px-8 2xl:px-0'>
        <ol className="flex list-none items-center p-0 text-base text-sky-700">
          <li className="flex items-center">
            <Link href="/" className="hover:text-rose-800 transition-colors">Home</Link>
            {pathSegments.length > 0 && <ArrowIcon />}
          </li>

          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <li key={href} className="flex items-center">
                {isLast ? (
                  <span className="font-bold text-sky-950 capitalize">
                    {segment.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <>
                    <Link href={href} className="hover:text-rose-800 transition-colors capitalize">
                      {segment.replace(/-/g, ' ')}
                    </Link>
                    <span className="flex items-center">
                      <ArrowIcon />
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;