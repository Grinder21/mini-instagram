import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/auth/lib/useAuth";
import { SpinnerLoader } from "@/shared/ui/Loader";

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { status, user, loginById, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = useMemo(() => {
    const st = location.state as { from?: { pathname?: string } } | null;
    return st?.from?.pathname ?? null;
  }, [location.state]);

  useEffect(() => {
    if (status === "authenticated" && user) {
      navigate(fromPath ?? `/users/${user.id}`, { replace: true });
    }
  }, [status, user, fromPath, navigate]);

  const isBusy = status === "loading";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    const id = Number(value);
    if (!Number.isFinite(id) || id <= 0) {
      setLocalError("Введите корректный userId (число > 0)");
      return;
    }

    loginById(id);
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-semibold">Login</h1>

      <form className="mt-6 space-y-3" onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-gray-700">
          User ID
        </label>

        <input
          className="w-full rounded-xl border px-3 py-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="не знаю, пусть будет 1"
          inputMode="numeric"
          autoFocus
        />

        {localError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {localError}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            Не удалось войти: {error || "unknown error"}
          </div>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {isBusy ? "Входим..." : "Войти"}
        </button>

        {isBusy && (
          <div className="pt-2">
            <SpinnerLoader />
          </div>
        )}
      </form>
    </div>
  );
}
