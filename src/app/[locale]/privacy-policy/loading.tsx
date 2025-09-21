import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex h-[200px] items-center justify-center">
      <LoaderCircle className="text-main size-10 animate-spin" />
    </section>
  );
}
