import Button from "@/shared/ui/Button";
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
    <>
      <h1>User Page</h1>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <Button />
    </>
  );
}

// потом делаю запрос на получение альбомов /albums?userId=:id и передаю все это в UserPageView
