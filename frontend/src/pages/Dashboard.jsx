import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export function Dashboard() {
  const { request, endpoints } = useApi();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const data = await request(endpoints.user.profile, { method: "GET" });
      setUser(data);
    };
    getUser();
  }, []);

  return (
    <main>
      {console.log(user)}
      <h1>Dashboard xd</h1>
    </main>
  );
}
