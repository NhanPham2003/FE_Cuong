import roles from "./roles"

export default [
  {
    title: "Home",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
    roles: [roles.Admin, roles.Censor, roles.User],
  },
  {
    title: "Manage",
    icon: { icon: "tabler-list-details" },
    children: [{ title: "User manage", to: "user-manage", roles: [roles.Admin] }],
  },
]
