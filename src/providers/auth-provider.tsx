import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

/**import component */
import { getMe, login } from "@/api/api";
import { boolean } from "zod";
type UserData = {
  username: string;
  email: string;
  role: string | null;
} | null;
type AuthData = {
  userData: any;
  isLoading: boolean;
  setUserData: (value: any) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthData>({
  userData: null,
  isLoading: false,
  setUserData: () => boolean,
  logOut: () => Promise.resolve(),
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetMe = async () => {
    try {
      const res = await getMe();
      console.log("res me: ", res);
      setUserData(res);
    } catch (error) {
      console.log("error: ", error);
    }
    //setUserData({...userData, res.data.DT.payload.userRole.email})
  };
  const logOut = () => {
    setUserData(null);
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, isLoading, setUserData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
