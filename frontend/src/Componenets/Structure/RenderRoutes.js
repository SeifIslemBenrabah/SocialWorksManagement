import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthData } from "../../Auth/AuthWrapper";
import { routesConfig } from "./RoutesConfig";
import NotFound from "../NotFound";

const RenderRoutes = () => {
  const { User } = AuthData();

  const renderRoutes = (routes) => {
    return routes.map(({ path, element, children }, index) => (
      <Route key={index} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));
  };

  return (
    <Routes>
      {renderRoutes(routesConfig.public)}

      {User?.isAuth && User.roletype === "Committee" && (
        <>
          {renderRoutes(routesConfig.committee)}
          <Route path="*" element={<Navigate to="/Committee" replace />} />
        </>
      )}

      {User?.isAuth && User.roletype === "Employee" && (
        <>
          {renderRoutes(routesConfig.user)}
          <Route path="*" element={<Navigate to="/Employee" replace />} />
        </>
      )}

      {User?.isAuth && User.roletype === "Admin" && (
        <>
          {renderRoutes(routesConfig.admin)}
          <Route path="*" element={<Navigate to="/Admin" replace />} />
        </>
      )}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RenderRoutes;
