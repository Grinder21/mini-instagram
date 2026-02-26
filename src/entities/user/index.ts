export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export function isUser(payload: unknown): payload is User {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const maybeUser = payload as Partial<User>;

  return (
    typeof maybeUser.id === "number" &&
    typeof maybeUser.name === "string" &&
    typeof maybeUser.email === "string"
  );
}
