export default function UserPage() {
  return <></>;
}

// здесь я получаю userId из URL, делаю запрос /users/:id - получаю данные о пользователе.
// потом делаю еще один запрос на получение альбомов /albums?userId=:id и передаю все это в UserPageView
