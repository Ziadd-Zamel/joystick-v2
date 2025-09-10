"use client";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import OtpForm from "@/components/auth/otp-form";
import ForgotPasswordForm from "@/components/auth/forget-password-form";
import NewPasswordForm from "@/components/auth/reset-password-form";

// Authentication views/steps
type AuthView = "auth" | "forgot" | "otp" | "new-password";

type AuthDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
};

export default function AuthDialog({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  showTrigger = true,
}: AuthDialogProps = {}) {
  // State - use internal state if no external control is provided
  const [internalOpen, setInternalOpen] = useState(false);
  const [view, setView] = useState<AuthView>("auth");
  const [phoneNumber, setPhoneNumber] = useState("01091732409");

  // Translations
  const t = useTranslations("auth");

  // Use external state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange !== undefined ? externalOnOpenChange : setInternalOpen;

  // Handler to initiate forgot password
  const handleForgotPassword = () => {
    setView("forgot");
  };

  // Navigate to next step
  const handleNextStep = (nextStep: AuthView) => {
    setView(nextStep);
  };

  // Handler for completing authentication
  const handleComplete = () => {
    setOpen(false);

    // Reset view to default after dialog closes
    setTimeout(() => {
      setView("auth");
    }, 500);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    // Reset view to default when dialog closes
    setTimeout(() => {
      if (!newOpen) setView("auth");
    }, 500);
  };

  const renderContent = () => {
    switch (view) {
      // Forgot password step
      case "forgot":
        return (
          <ForgotPasswordForm
            setPhoneNumber={setPhoneNumber}
            onNext={() => handleNextStep("otp")}
          />
        );

      // OTP verification step
      case "otp":
        return <OtpForm phoneNumber={phoneNumber} onNext={() => handleNextStep("new-password")} />;

      // New password step
      case "new-password":
        return <NewPasswordForm phoneNumber={phoneNumber} onComplete={handleComplete} />;

      // Default view
      default:
        return (
          <>
            <DialogHeader>
              <Tabs defaultValue="login">
                <TabsList className="mt-2 w-full justify-between bg-transparent">
                  {/* Tab Triggers */}
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

                {/* Tab content */}
                <TabsContent value="login">
                  <LoginForm setOpen={setOpen} onForgotPassword={handleForgotPassword} />
                </TabsContent>

                <TabsContent value="register">
                  <RegisterForm setOpen={setOpen} />
                </TabsContent>
              </Tabs>
            </DialogHeader>
          </>
        );
    }
  };

  // Main component render
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Dialog trigger button - only show if showTrigger is true */}
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded py-1.5 text-sm md:text-base">
            {t("login-signup")}
          </Button>
        </DialogTrigger>
      )}

      {/* Dialog content container*/}
      <DialogContent className="min-h-fit !max-w-md bg-white p-0 pb-4">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
