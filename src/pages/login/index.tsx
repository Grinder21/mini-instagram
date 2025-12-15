import { LoginPageView } from "../../widgets/login-page/ui/LoginPageView";

export default function LoginPage() {
  return <LoginPageView />;
}

// здесь я получаю ввод userId + делаю проверку /users/:id. Если ок, то передаю userId в LoginPageView
