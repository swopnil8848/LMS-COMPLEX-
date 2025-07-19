import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  //example of how to get data in page (yeman)
  const { isAuthenticated,user } = useSelector((state: RootState) => state.auth);

  // example (yeman)
  console.log("isAuthenticated:: ",isAuthenticated);
  console.log("user:: ",user)

  return (
    <div>DashboardHome</div>
  )
}

export default DashboardHome