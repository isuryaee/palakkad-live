import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default async function DeskPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LivePalakkad Admin</h1>
            <p className="text-gray-600">Logged in as {session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirect: true, redirectUrl: "/auth/signin" });
            }}
          >
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Links */}
          <DashboardCard
            title="Articles"
            description="Create, edit, and publish articles"
            href="/desk/articles"
            icon="📰"
          />
          <DashboardCard
            title="Categories"
            description="Manage article categories"
            href="/desk/categories"
            icon="📂"
          />
          <DashboardCard
            title="Locations"
            description="Manage Palakkad locations"
            href="/desk/locations"
            icon="📍"
          />
          <DashboardCard
            title="Comments"
            description="Moderate user comments"
            href="/desk/comments"
            icon="💬"
          />
          <DashboardCard
            title="Users & Roles"
            description="Manage staff access and permissions"
            href="/desk/users"
            icon="👥"
          />
          <DashboardCard
            title="Analytics"
            description="View site traffic and trends"
            href="/desk/analytics"
            icon="📊"
          />
        </div>

        {/* Welcome Message */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Welcome to LivePalakkad Admin</h2>
          <p className="text-blue-800 mb-4">
            This is your control center for managing all LivePalakkad news content, users, and settings. More features are being built and will appear here.
          </p>
          <p className="text-blue-700 text-sm">
            Phase 1 is complete: Database, Authentication, and Role-Based Access Control are ready. Phase 2 will introduce the article management interface.
          </p>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-200"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
