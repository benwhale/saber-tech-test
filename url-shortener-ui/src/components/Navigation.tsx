"use client";
import { Disclosure } from "@headlessui/react";

import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

import Link from "next/link";

const navigation = [
  // Hardcoded navigation items for now
  { name: "Shorten URL", href: "/", current: true },
  { name: "Upload File", href: "/upload", current: false },
  { name: "View History", href: "/history", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
