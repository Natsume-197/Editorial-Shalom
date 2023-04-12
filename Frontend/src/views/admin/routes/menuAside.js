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
    mdiPencilBoxOutline,
    mdiClipboardTextClockOutline
  } from "@mdi/js";
  
  export default [
    {
      to: "/dashboard/inicio",
      icon: mdiViewDashboard,
      label: "Inicio",
    },
    { 
      to: "/dashboard/ventas",
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
          to: "/dashboard/inventario/visualizar",
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
      to: "/dashboard/perfil",
      label: "Perfil",
      icon: mdiAccount,
    },
  ];