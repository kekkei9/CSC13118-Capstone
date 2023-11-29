import React from "react";
import { useAppSelector } from "../../redux/store";

type AuthProviderProps = {
  authComponent: () => JSX.Element;
  unAuthComponent: () => JSX.Element;
};

export default function AuthProvider({
  authComponent: AuthComponent,
  unAuthComponent: UnAuthComponent,
}: AuthProviderProps) {
  const { isAuth } = useAppSelector((state) => state.authentication);

  return <>{isAuth ? <AuthComponent /> : <UnAuthComponent />}</>;
}
