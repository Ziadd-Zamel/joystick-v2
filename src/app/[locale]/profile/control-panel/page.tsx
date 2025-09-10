import ProfileSettingsForm from "./_components/profile-settings-form";
import ProfileEmailForm from "./_components/profile-email-form";
import ProfilePasswordForm from "./_components/profile-password-form";
import { getUserDetails } from "@/lib/actions/profile.actions";

export default async function Page() {
  const userData = await getUserDetails();

  if (!userData) return <p className="font-xl text-center text-red-500"> User Not Found</p>;

  return (
    <div className="mx-auto space-y-5">
      {/* Profile Settings */}
      <ProfileSettingsForm userData={userData} />

      {/* Profile Change email */}
      <ProfileEmailForm />

      {/* Profile Change passsword */}
      <ProfilePasswordForm />
    </div>
  );
}
