import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export default function LoginButton() {
  const t = useTranslations("auth");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded py-1.5 text-sm md:text-base">
          {t("login-signup")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-fit !max-w-md bg-white p-0 pb-5">
        <DialogHeader>
          <Tabs defaultValue="login">
            <TabsList className="mt-2 w-full justify-between bg-transparent">
              <TabsTrigger
                className="rounded-none border-x-0 border-t-0 border-b border-[#E4E7E9] py-6 text-lg data-[state=active]:border-b-3 data-[state=active]:!border-[#02A09B] data-[state=active]:!bg-transparent data-[state=active]:!text-[#02A09B] data-[state=active]:shadow-none"
                value="register"
              >
                {t("signup")}
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none border-x-0 border-t-0 border-b border-[#E4E7E9] py-6 text-lg data-[state=active]:border-b-3 data-[state=active]:!border-[#02A09B] data-[state=active]:!bg-transparent data-[state=active]:!text-[#02A09B] data-[state=active]:shadow-none"
                value="login"
              >
                {t("login")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
