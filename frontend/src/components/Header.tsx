import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const menuList = [
    {
      id: 1,
      link: "menu",
    },
    {
      id: 2,
      link: "blog",
    },
    {
      id: 3,
      link: "pricing",
    },
    {
      id: 4,
      link: "contact",
    },
  ];
  return (
    <header className="header">
      <div className="pt-[47px]! pb-[25px]! container flex justify-between border-b-1 border-[#cbcbcb]">
        <div className="flex gap-[50px] sm:gap-[102px] ">
          <Link className="flex items-center gap-[11px]" href="/">
            <Image
              src="/assets/img/favicon.svg"
              alt="eatly"
              width={46}
              height={42}
              priority
            />
            <span className="text-[22px] leading-[1.3] text-purple font-semibold">
              eatly
            </span>
          </Link>
          <ul className="flex items-center gap-[54px]">
            {menuList.map((item) => (
              <li key={item.id}>
                <Link
                  className="relative text-[18px] text-gray leading-[26px] font-inter font-medium capitalize hover:text-purple transition-all duration-300 group"
                  href={`/${item.link.toLowerCase()}`}
                >
                  <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                  {item.link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-x-[36px] items-center">
          <Link
            href="#!"
            className="relative text-[18px] text-gray leading-[26px] font-bold capitalize hover:text-purple transition-all duration-300 group"
          >
            <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
            login
          </Link>
          <Link
            href="#!"
            className="text-[18px] leading-[26px] font-bold capitalize rounded-[18px] bg-purple text-lighwhite py-[17px] px-[25px] border-2 border-purple transition-all duration-300 hover:bg-white hover:text-purple"
          >
            sing up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
