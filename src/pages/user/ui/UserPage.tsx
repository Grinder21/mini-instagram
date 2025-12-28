import { useParams } from "react-router-dom";
import { SpinnerLoader } from "@/shared/ui/Loader";
import { useGetUser } from "@/features/getUser/api/useGetUser";

export default function UserPage() {
  const { id } = useParams();

  const userId = (() => {
    if (!id) return undefined;
    const n = Number(id);
    return Number.isFinite(n) ? n : undefined;
  })();

  const { isLoading, user, error } = useGetUser(userId);

  if (userId === undefined) {
    return <div className="p-6 text-center">Неверный id пользователя</div>;
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <SpinnerLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center">Ошибка: {error}</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">Пользователь не найден</div>;
  }

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          User
        </h1>

        <div className="mt-6 space-y-3">
          <div className="rounded-xl border bg-gray-50 px-4 py-3 text-base text-gray-900 shadow-inner">
            {user.name}
          </div>

          <div className="rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-inner">
            {user.email}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 text-center text-sm font-medium tracking-wide text-gray-800">
            Albums
          </div>

          <div className="flex justify-center gap-4">
            <div className="h-20 w-20 rounded-xl border bg-gray-100" />
            <div className="h-20 w-20 rounded-xl border bg-gray-100" />
            <div className="h-20 w-20 rounded-xl border bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
