import Home from "../Home";
import Login from "../Login";
import ForgetPwd from "../ForgetPwd";
import DashboardC from "../DashboardC";
import NotFound from "../NotFound";
import Commette from "../Commette";
import Programmes from "../Programmes";
import Demand from "../Demand";
import Profile from "../Profile";
import Meeting from "../Meeting";
import UDemand from "../UDemand";
import UProgrammes from "../UProgrammes";
import Users from "../Users";
import ProgrammeDetail from "../ProgrammeDetail";
import Admin from "../Admin";
import EmployeList from "../EmployeList";
import CommiteList from "../CommiteList";


export const routesConfig = {
  public: [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/forget-pwd", element: <ForgetPwd /> },
    {path:"*",element:<NotFound/>}
  ],
  committee: [
    {
      path: "/Committee",
      element: <Commette />,
      children: [
        { path: "", element: <DashboardC /> },
        { path: "dashboard", element: <DashboardC /> },
        { path: "programmes", element: <Programmes /> },
        { path: "demand", element: <Demand /> },
        { path: "profile", element: <Profile /> },
        { path: "meeting", element: <Meeting /> },
      ],
    },
  ],
  user: [
    {
      path: "/Employee",
      element: <Users />,
      children: [
        { path: "", element: <UProgrammes /> },
        { path: "u-programmes", element: <UProgrammes /> },
        { path: "programme/:id", element: <ProgrammeDetail /> },
        { path: "u-demand", element: <UDemand /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ],
  admin: [
    {
      path: "/Admin",
      element: <Admin />,
      children: [
        { path: "", element: <EmployeList /> },
        { path: "employees", element: <EmployeList /> },
        { path: "committees", element: <CommiteList /> },
      ],
    },
  ],
};
