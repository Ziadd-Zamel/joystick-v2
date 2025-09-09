"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

// Import your forms
import OtpForm from "@/components/auth/otp-form";
import ForgotPasswordForm from "./forget-password-form";
import NewPasswordForm from "./reset-password-form";

type Step = "forgot" | "otp" | "new-password";

export default function ForgotPasswordDialog() {
  const t = useTranslations("auth");
  const [step, setStep] = useState<Step>("forgot");

  const renderForm = () => {
    switch (step) {
      case "forgot":
        return <ForgotPasswordForm />;
      case "otp":
        return <OtpForm />;
      case "new-password":
        return <NewPasswordForm />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 text-sm text-[#02A09B] hover:underline">
          {t("forget-password")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[50vh] !max-w-md bg-white p-5">
        <DialogHeader />
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}
