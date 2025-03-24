import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";

export const AdminGuard = ({children}) => {
    const router = useRouter();
    const { user, loading } = useUser();
  
    useEffect(() => {
      if (loading) return; 
  
   
      if (!user || user.role !== "admin") {
        console.log("Acceso no autorizado");
        router.push("/products");
      }
    }, [user, loading, router]); 
  
    if (loading || (!user || user.role !== "admin")) {
      return <Spinner />;
    }


  return (
    <>{children}</>
  )
}
