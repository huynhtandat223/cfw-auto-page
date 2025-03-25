import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { navGroups } from "../../App";

export const MainLayout = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">CFW Auto Page</h1>
        </div>
        <nav>
          {navGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">{group.title}</h2>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.url}>
                    <Link
                      to={item.url}
                      className={`flex items-center px-3 py-2 rounded-md ${
                        router.state.location.pathname === item.url
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}; 