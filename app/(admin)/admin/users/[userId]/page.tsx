import { getAdminUserById, updateAdminUser } from "@/lib/actions/admin/users";
import { format } from "date-fns";
import { ArrowLeft, ShieldCheck, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getAdminUserById(userId);

  if (!user) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    const role = formData.get("role") as "USER" | "ADMIN";
    const name = formData.get("name") as string;
    await updateAdminUser(userId, { role, name });
    redirect("/admin/users");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-1000">
      {/* Header */}
      <header className="space-y-4 border-b border-gray-100 pb-8">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-black transition-colors"
        >
          <ArrowLeft size={12} /> Back to Directory
        </Link>
        <h1 className="text-4xl font-medium uppercase tracking-tighter">
          User Profile
        </h1>
      </header>

      <form action={handleUpdate} className="space-y-16">
        {/* Section 01: Identity */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-black pb-2">
            <UserIcon size={14} />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em]">
              01. Identity
            </h2>
          </div>

          <div className="grid gap-10">
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                Full Name
              </label>
              <input
                name="name"
                defaultValue={user.name || ""}
                className="w-full bg-transparent border-b border-gray-100 py-2 focus:border-black outline-none transition-colors text-sm font-medium"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <p className="text-sm font-mono text-foreground lowercase">
                {user.email}
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Access Control */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-black pb-2">
            <ShieldCheck size={14} />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em]">
              02. Access
            </h2>
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Privilege Level
            </label>
            <select
              name="role"
              defaultValue={user.role}
              className="w-full bg-transparent border-b border-gray-100 py-2 focus:border-black outline-none transition-colors text-xs font-bold uppercase tracking-widest appearance-none cursor-pointer"
            >
              <option value="USER">Standard Member</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        </section>

        {/* Section 03: Activity Info */}
        <section className="space-y-4 pt-4 text-[10px] text-muted-foreground font-mono uppercase tracking-tighter border-t border-gray-50">
          <div className="flex justify-between">
            <span>Registration Date</span>
            <span>
              {user.createdAt
                ? format(new Date(user.createdAt), "dd.MM.yyyy HH:mm")
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Acquisitions</span>
            <span className="text-black font-bold">
              {user.orders.length.toString().padStart(2, "0")}
            </span>
          </div>
        </section>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full h-14 bg-black text-white hover:bg-zinc-800 transition-colors uppercase text-[10px] font-bold tracking-[0.4em]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
