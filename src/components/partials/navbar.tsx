import React from "react";
import Link from "next/link";
import { FaCoins } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getProfile from "@/actions/getProfile";
import Logout from "./logout";

const Navbar = async () => {
  const profile = await getProfile();

  return (
    <header className="h-[4.5rem] border-b">
      <div className="container mx-auto flex h-full items-center justify-between px-8">
        <Link href="/" className="text-xl font-bold flex items-center gap-x-3">
          <FaCoins className="text-amber-500" />
          <div>
            Expense<span className="text-amber-500">Tracker</span>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer group">
              <AvatarImage src="#" alt="" />
              <AvatarFallback className="text-sm">
                <FaUser className="text-zinc-300 group-hover:text-amber-500 group-data-[state=open]:text-amber-500" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[15rem]">
            <DropdownMenuLabel className="flex items-start gap-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="#" alt="" />
                <AvatarFallback className="text-base">
                  <FaUser className="text-zinc-300" />
                </AvatarFallback>
              </Avatar>
              <div className="mt-0.5">
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0 overflow-hidden">
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
