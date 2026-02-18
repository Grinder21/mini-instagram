import { Link } from "react-router-dom";
import { useAuth } from "@/app/providers/auth/lib/useAuth";

export default function ForbiddenPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-3xl font-semibold">Нет доступа</h1>
      <p className="mt-2 text-sm text-gray-600">
        Эта страница доступна только владельцу аккаунта.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        {user ? (
          <Link
            to={`/users/${user.id}`}
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            На мою страничку
          </Link>
        ) : (
          <Link
            to="/login"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            На логин
          </Link>
        )}

        <Link to="/" className="rounded-xl border px-4 py-2 text-gray-800">
          На главную
        </Link>
      </div>
    </div>
  );
}
