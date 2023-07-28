"use client";
import classNames from "classnames";
import {
  InventoryIcon,
  ManageStore,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  ReportIcon,
  OrderIcon,
  SupplierIcon
} from "../../assets/icons";


// List of labels and icons of Side Bar
const menuItems = [
  { id: 1, label: "Dashboard", icon: HomeIcon, link: "/" },
  { id: 2, label: "Inventory", icon: InventoryIcon, link: "/inventory" },
  { id: 3, label: "Reports", icon: ReportIcon, link: "/reports" },
  { id: 4, label: "Suppliers", icon: SupplierIcon, link: "/suppliers" },
  { id: 3, label: "Orders", icon: OrderIcon, link: "/orders" },
  { id: 4, label: "Manage Store", icon: ManageStore, link: "/managestore" },
];



const Sidebar = () => {

  // Main Styles of Side Bar
  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col bg-white border-r-2"
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
    );
  };

  return (
    <div
      className={wrapperClasses}
      style={{
        transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
        width: "15rem",
        position: "fixed", 
        top: 0, 
        left: 0,
        bottom: 0,
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span className={classNames("mt-2 text-lg font-medium text-text")}>
              KANABAN
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <a className="flex py-4 px-3  w-full h-full">
                  <div style={{ width: "2.5rem" }}>
                    <Icon />
                  </div>

                  <span className={classNames(" text-gray-400 font-light")}>
                    {menu.label}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>

        <span className={classNames(" text-gray-400 font-light")}>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
