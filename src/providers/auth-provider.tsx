import { useGetMe } from "@/api/api";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  user: any;
  isLoading: boolean;
};

const AuthContext = createContext<AuthData>({
  user: null,
  isLoading: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<{
    avatar_url: string;
    created_at: string | null;
    email: string;
    expo_notification_token: string | null;
    id: string;
    stripe_customer_id: string | null;
    type: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useGetMe();
  console.log("data: ", data);
  console.log("error: ", error);
  // const { data, error } = useGetProductsAndCategories();

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
