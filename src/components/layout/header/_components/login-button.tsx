import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Button
      variant={"ghost"}
      className="text-xl font-medium text-[#02a09b] hover:text-[#02a09b]/90"
    >
      Login/Signup
    </Button>
  );
}
