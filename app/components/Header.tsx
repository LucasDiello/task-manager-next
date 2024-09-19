import Image from "next/image";
import LogoIcon from "../public/Logomark.png";

function Header({ blurClass }: { blurClass: string }) {
    return (
      <header className={`header ${blurClass}`}>
        <div className="content-header">
          <div className="logo-header">
            <Image src={LogoIcon} alt="Logo" width={33.1} height={32.93} />
            <h1 className="h1-logo">FocalPoint</h1>
          </div>
          <h1>Bem-vindo de volta, Marcus</h1>
          <h2>Segunda, 01 de dezembro de 2025</h2>
        </div>
      </header>
    );
  }

export default Header;