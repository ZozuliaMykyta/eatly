import Image from "next/image";
import Link from "next/link";

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
