import React from "react";
import ProfileSettingsForm from "./_components/profile-settings-form";
import ProfileEmailForm from "./_components/profile-email-form";
import ProfilePasswordForm from "./_components/profile-password-form";

export default function Page() {
  return (
    <div className="mx-auto my-10 max-w-[1000px] space-y-5">
      {/* Profile Settings */}
      <ProfileSettingsForm />

      {/* Profile Change email */}
      <ProfileEmailForm />

      {/* Profile Change passsword */}
      <ProfilePasswordForm />
    </div>
  );
}
