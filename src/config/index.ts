// icons
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/BarChartOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';

// components
import Home from "../pages/Home";
import CatalogoGeneral from "../pages/CatalogoGeneral";
import Settings from "../pages/Settings";
import AddImage from "../pages/addImages";
// interface
import RouteItem from "../model/RouteItem.model";

// define app routes
export const routes: Array<RouteItem> = [
  {
    key: "router-home",
    title: "Inicio",
    tooltip: "Página principal",
    path: "/",
    enabled: true,
    component: Home,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-dashboard",
    title: "Catálogo General",
    tooltip: "Catálogo general de productos",
    path: "/CatalogoGeneral",
    enabled: true,
    component: CatalogoGeneral,
    icon: DashboardIcon,
  },
  {
    key: "router-settings",
    title: "Configuración",
    tooltip: "Configuración",
    path: "/settings",
    enabled: true,
    component: Settings,
    appendDivider: true,
    icon: SettingsIcon,
  },
  {
    key: "router-addImage",
    title: "Agregar Imagen",
    tooltip: "Agrega una imagen o una carpeta",
    path: "/addImage",
    enabled: true,
    component: AddImage,
    icon: AddAPhotoTwoToneIcon
    ,
    appendDivider: true,
  },
];
