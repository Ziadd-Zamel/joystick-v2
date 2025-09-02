import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

const AppButtons = () => {
  return (
    <div className="flex gap-2">
      {/* Google Play Button */}
      <Link href={"#"} className="bg-transparent">
        <Image
          src="/assets/icons/googleplay.svg"
          alt="Download on Google Play"
          width={150}
          height={0}
          priority
          className="mr-2"
        />
      </Link>

      {/* App Store Button */}
      <Link href={"#"} className="bg-transparent">
        <Image
          src="/assets/icons/appstore.svg"
          alt="Download on the App Store"
          width={150}
          height={0}
          priority
          className="mr-2"
        />
      </Link>
    </div>
  );
};

export default AppButtons;
