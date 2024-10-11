"use client";
import React from "react";
import { Button } from "../ui/button";
import logout from "@/app/(auth)/logout";

const Logout = () => {
  const onLogout = async () => {
    await logout();
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="w-full rounded-none justify-start"
      onClick={onLogout}>
      Logout
    </Button>
  );
};

export default Logout;
