import DeleteAccountSection from "@/app/(dashboard)/account/profile/_components/delete-account";
import ProfileView from "@/app/(dashboard)/account/profile/_components/profile-view";
import { getUserInfos } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUserInfos();
  if (!user) redirect("/auth/signin");

  return (
    <div className="max-w-2xl space-y-12 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium uppercase tracking-tighter">
          Identity
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Manage your personal information and credentials
        </p>
      </div>

      <div className="border-t border-gray-100 pt-12">
        <ProfileView initialData={user} />
      </div>

      <DeleteAccountSection />
    </div>
  );
}
