export function useGetData<T>(
  url: string,
  parametr?: Record<string, string | number>
) {
  return null;
}
useGetData<User>("https://jsonplaceholder.typicode.com/users/10");
useGetData<User>("https://jsonplaceholder.typicode.com/users/${id}", {
  id: 10,
}); // todo: задание со звездочкой
