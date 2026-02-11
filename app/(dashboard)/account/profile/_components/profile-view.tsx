"use client";

interface ProfileViewProps {
  initialData: {
    name: string | null;
    email: string | null;
    createdAt?: Date | string | null;
  };
}

export default function ProfileView({ initialData }: ProfileViewProps) {
  return (
    <div className="space-y-12 max-w-2xl">
      <div className="grid grid-cols-1 gap-12">
        <div className="flex flex-col border-b border-gray-100 pb-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Identity Name
          </span>
          <span className="text-sm uppercase tracking-widest font-medium">
            {initialData.name || "Anonymous User"}
          </span>
        </div>

        <div className="flex flex-col border-b border-gray-100 pb-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Email Contact
          </span>
          <span className="text-sm text-gray-500 font-light">
            {initialData.email}
          </span>
        </div>

        <div className="flex flex-col border-b border-gray-100 pb-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Member Since
          </span>
          <span className="text-sm text-gray-500 font-light italic">
            {initialData.createdAt
              ? new Date(initialData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </span>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground uppercase tracking-tight leading-relaxed">
        To update your primary security information, please contact our support
        team.
      </p>
    </div>
  );
}
