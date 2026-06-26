import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect } from "react";

export default function HomePage() {
  const { users } = useSelector((state: RootState) => state.usersSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "Fetch-USERS" });
  }, [dispatch]);
  console.log(users);
  return (
    <div>
      <h1> Home Page</h1>
    </div>
  );
}
