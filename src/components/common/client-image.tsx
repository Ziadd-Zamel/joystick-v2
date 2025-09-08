/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";

export function ClientImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  [key: string]: any;
}) {
  const [error, setError] = useState(false);

  const isAbsoluteUrl = src?.startsWith("http://") || src?.startsWith("https://");

  const finalSrc = isAbsoluteUrl
    ? src
    : `https://joystick.evyx.lol/${src?.startsWith("/") ? src.slice(1) : src}`;

  return error ? (
    <Image src={"/assets/Images/placeholder.svg"} alt={alt} {...props} loading="lazy" />
  ) : (
    <Image src={finalSrc} alt={alt} onError={() => setError(true)} {...props} />
  );
}
