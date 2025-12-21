import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpinnerLoader } from "@/shared/ui/Loader";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user)
    return (
      <div>
        <SpinnerLoader />
      </div>
    );

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
            <div className="h-50 w-50 rounded-xl border bg-gray-100" />
            <div className="h-50 w-50 rounded-xl border bg-gray-100" />
            <div className="h-50 w-50 rounded-xl border bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

// потом делаю запрос на получение альбомов /albums?userId=:id и передаю все это в UserPageView
