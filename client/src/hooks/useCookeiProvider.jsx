import { useContext } from "react"
import { UserContext } from "./userInfo"





const useCookeiProvider = () => {
  const{user}=useContext(UserContext);
  console.log(user);
 
 
  return [user];
}

export default useCookeiProvider