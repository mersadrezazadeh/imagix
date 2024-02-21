import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex justify-center md:py-2">
      <Image
        src="/assets/images/logoipsum.svg"
        alt="logo"
        width={180}
        height={28}
      />
    </Link>
  );
}

export default Logo;
