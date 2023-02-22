import {
    mdiBookOpenPageVariant ,
    mdiCogs,
    mdiBookshelf,
    mdiTable,
    mdiBookPlus,
    mdiCartOutline,
    mdiAccountPlus,
    mdiViewDashboard,
    mdiAccountMultipleOutline,
    mdiTune,
    mdiAccount,
    mdiPencilBoxOutline
  } from "@mdi/js";
  
  export default [
    {
      to: "/dashboard/inicio",
      icon: mdiViewDashboard,
      label: "Inicio",
    },
    {
      to: "/dashboard/diseño",
      icon: mdiPencilBoxOutline,
      label: "Diseño",
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
          to: "/dashboard/inventario/agregar",
          label: "Añadir",
          icon: mdiBookPlus
        },
        {
          label: "Visualizar",
          icon: mdiBookOpenPageVariant
        },
        {
          label: "Parametrización",
          icon: mdiTune
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
      to: "/dashboard/perfil",
      label: "Perfil",
      icon: mdiAccount,
    },
    {
      to: "/dashboard/ajustes",
      label: "Ajustes",
      icon: mdiCogs,
    },
  ];