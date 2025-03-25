import { Home } from "../../../../pages/Home";
import { Employees } from "../../../../pages/Employees";

export const pages = [
  {
    id: 1,
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    id: 2,
    name: "Employees",
    component: Employees,
    path: "/employees",
  },
];
