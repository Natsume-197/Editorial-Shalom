import {
    mdiBookOpenPageVariant ,
    mdiCogs,
    mdiBookshelf,
    mdiTable,
    mdiBookPlus,
    mdiCartOutline,
    mdiAccountPlus,
    mdiViewDashboard,
    mdiAccountMultipleOutline
  } from "@mdi/js";
  
  export default [
    {
      to: "/dashboard/inicio",
      icon: mdiViewDashboard,
      label: "Inicio",
    },
    {
      icon: mdiCartOutline,
      label: "Ventas",
    },
    {
      label: "Inventario",
      icon: mdiBookshelf,
      menu: [
        {
          label: "Añadir",
          icon: mdiBookPlus
        },
        {
          label: "Visualizar",
          icon: mdiBookOpenPageVariant
        },
      ],
    },
    {
      label: "Usuarios",
      icon: mdiTable,
      menu: [
        {
          to: "/dashboard/usuarios/agregar",
          label: "Agregar",
          icon: mdiAccountPlus
        },
        {
          to: "/dashboard/usuarios/visualizar",
          label: "Visualizar",
          icon: mdiAccountMultipleOutline
        },
      ],
    },
    {
      isDivider: true,
    },
    {
      href: "https://github.com/justboil/admin-one-vue-tailwind",
      label: "Manual",
      icon: mdiBookOpenPageVariant ,
      target: "_blank",
    },
    {
      to: "/error",
      label: "Ajustes",
      icon: mdiCogs,
    },
  ];