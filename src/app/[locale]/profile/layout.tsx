import ProfileBreadCrumbs from "./_components/profile-breadcrumb";
import ProfileSideBar from "./_components/profile-sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileBreadCrumbs />
      <div className="container mx-auto flex w-full flex-col gap-6 lg:flex-row">
        <ProfileSideBar />

        <main className="w-full flex-grow lg:w-[calc(100%-16rem)]">{children}</main>
      </div>
    </>
  );
};

export default ProfileLayout;
