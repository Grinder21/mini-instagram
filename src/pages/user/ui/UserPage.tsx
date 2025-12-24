import { useParams } from "react-router-dom";
import { SpinnerLoader } from "@/shared/ui/Loader";
import { useGetUser } from "@/features/getUser/api/useGetUser";

export default function UserPage() {
  const { id } = useParams();

  // todo: обработать нереальный id, например id 43243242532
  const { isLoading, user } = useGetUser(
    typeof id === "string" ? Number(id) : id
  );

  // кастомный хук для запроса пользователя getUserData с state + state для loading
  // + выкинуть исключения

  if (isLoading)
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  // todo: user отсутствует, не загрузился
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          User
        </h1>

        <div className="mt-6 space-y-3">
          <div className="rounded-xl border bg-gray-50 px-4 py-3 text-base text-gray-900 shadow-inner">
            {user?.name}
          </div>

          <div className="rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-inner">
            {user?.email}
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

// потом делаю запрос на получение альбомов /albums?userId=:id и передаю все это в UserPageView
