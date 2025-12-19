import Button from "@/shared/ui/Button";

export default function UserPage() {
  return (
    <>
      <h1>User Page</h1>
      <Button />
    </>
  );
}

// здесь я получаю userId из URL, делаю запрос /users/:id - получаю данные о пользователе.
// потом делаю еще один запрос на получение альбомов /albums?userId=:id и передаю все это в UserPageView
