import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

/**import component */
import { getMe } from "@/api/api";

type AuthData = {
  userData: any;
  isLoading: boolean;
};

const AuthContext = createContext<AuthData>({
  userData: null,
  isLoading: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    role: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //const { data, error } = useGetMe();
  // console.log("data: ", data);
  // console.log("error: ", error);
  // const { data, error } = useGetProductsAndCategories();
  const handleGetMe = async () => {
    try {
      const res = await getMe();
      console.log("res me: ", res.data);
      console.log("email: ", res.data?.DT?.payload?.userRole?.email);
    } catch (error) {
      console.log("error: ", error);
    }
    //setUserData({...userData, res.data.DT.payload.userRole.email})
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
