import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const menuList = [
    {
      id: 1,
      link: "Menu",
    },
    {
      id: 2,
      link: "Blog",
    },
    {
      id: 3,
      link: "Pricing",
    },
    {
      id: 4,
      link: "Contact",
    },
  ];
  return (
    <header className="header">
      <div className="header__container container">
        <Link className="header__logo" href="/">
          <Image
            src="/assets/img/favicon.svg"
            alt="eatly"
            width={46}
            height={42}
            priority
          />
          eatly
        </Link>
        <ul className="header__list">
          {menuList.map((item) => (
            <li className="header__item" key={item.id}>
              <Link href={`/${item.link.toLowerCase()}`}>{item.link}</Link>
            </li>
          ))}
        </ul>
        <div className="header__authorization">
          <Link href="#!" className="header__login">
            Login
          </Link>
          <Link href="#!" className="header__singup">
            Sing Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
