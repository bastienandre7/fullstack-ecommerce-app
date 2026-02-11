import { getAdminUsers } from "@/lib/actions/admin/users";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Community
          </p>
          <h1 className="text-4xl font-medium uppercase tracking-tighter text-black">
            Customers
          </h1>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {users.length} Registered Members
        </p>
      </div>

      <div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                User Profile
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Role
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Joined
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Orders
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-right">
                Management
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-[#FAFAFA] transition-colors"
              >
                <td className="py-6">
                  <div className="text-[11px] font-bold uppercase tracking-tight text-black">
                    {user.email}
                  </div>
                </td>
                <td className="py-6 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter border ${
                      user.role === "ADMIN"
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-6 text-center text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                  {user.createdAt
                    ? format(new Date(user.createdAt), "dd.MM.yyyy")
                    : "—"}
                </td>
                <td className="py-6 text-center text-[11px] font-bold font-mono tracking-tighter text-black">
                  {user.orders.length.toString().padStart(2, "0")}
                </td>
                <td className="py-6 text-right">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-black transition-colors"
                  >
                    Edit{" "}
                    <ArrowUpRight
                      size={12}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
