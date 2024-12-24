"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import {
    ChartPieIcon,
    EnvelopeIcon,
    FolderIcon,
    HomeIcon,
    PaperAirplaneIcon,
    SparklesIcon,
    StarIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";

const navigation = [
    { name: "Dashboard", href: "/vectors", icon: HomeIcon },
    {
        name: "Resumes",
        icon: EnvelopeIcon,
        href: "/vectors/resumes",
    },
    {
        name: "Jobs",
        icon: FolderIcon,
        children: [
            { name: "All matches", href: "/vectors/jobs/all", icon: SparklesIcon },
            { name: "Shortlist", href: "/vectors/jobs/shortlisted", icon: StarIcon },
            {
                name: "Applications",
                href: "/vectors/jobs/applied",
                icon: PaperAirplaneIcon,
            },
        ],
    },
    { name: "Analysis", href: "/vectors/analysis", icon: ChartPieIcon },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Topbar() {
    const pathname = usePathname();

    return (
        <div className="md:hidden flex flex-row justify-between p-4 sticky top-0 z-40 bg-white">
            <div className="w-12">
                <Logo />
            </div>
            <div className="overflow-hidden">
                <Menu>
                    <MenuButton>
                        <Bars3Icon className="w-6" />
                    </MenuButton>
                    <MenuItems anchor="bottom" className="bg-white mt-6 ml-2 w-full h-full">
                        <MenuItem>
                            <nav className="flex flex-1 flex-col mr-4">
                                <ul role="list" className="space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            {!item.children ? (
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        pathname === item.href
                                                            ? "bg-purple-800 text-white rounded font-semibold"
                                                            : "hover:bg-purple-50",
                                                        "group flex gap-x-3 p-1 pl-2 text-gray-700",
                                                    )}>
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={
                                                            "size-6 shrink-0 " +
                                                            (item.href === pathname
                                                                ? "text-white"
                                                                : "text-gray-400")
                                                        }
                                                    />
                                                    {item.name}
                                                </a>
                                            ) : (
                                                <Disclosure as="div" defaultOpen={true}>
                                                    <DisclosureButton
                                                        disabled={true}
                                                        className={
                                                            "hover:bg-purple-50 group flex w-full gap-x-3 rounded-md p-1 pl-2 text-left text-gray-700"
                                                        }>
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className="size-6 shrink-0 text-gray-400"
                                                        />
                                                        {item.name}
                                                    </DisclosureButton>
                                                    <DisclosurePanel
                                                        as="ul"
                                                        className="mt-1 space-y-1">
                                                        {item.children.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <a
                                                                    href={subItem.href}
                                                                    className={classNames(
                                                                        pathname === subItem.href
                                                                            ? "bg-purple-800 text-white rounded font-semibold"
                                                                            : "hover:bg-purple-50",
                                                                        "group flex gap-x-3 rounded p-1 pr-0 pl-8 text-left text-gray-700",
                                                                    )}>
                                                                    <subItem.icon
                                                                        aria-hidden="true"
                                                                        className={
                                                                            "size-6 shrink-0 " +
                                                                            (pathname ===
                                                                            subItem.href
                                                                                ? "text-white"
                                                                                : "text-gray-400")
                                                                        }
                                                                    />
                                                                    {subItem.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </DisclosurePanel>
                                                </Disclosure>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
