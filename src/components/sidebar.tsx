"use client";
import Link from "next/link";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
    ChartPieIcon,
    EnvelopeIcon,
    FolderIcon,
    HomeIcon,
    PaperAirplaneIcon,
    SparklesIcon,
    StarIcon,
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    {
        name: "Resumes",
        icon: EnvelopeIcon,
        href: "/resumes",
    },
    {
        name: "Jobs",
        icon: FolderIcon,
        children: [
            { name: "All matches", href: "/jobs/all", icon: SparklesIcon },
            { name: "Shortlist", href: "/jobs/shortlisted", icon: StarIcon },
            {
                name: "Applications",
                href: "/jobs/applied",
                icon: PaperAirplaneIcon,
                current: false,
            },
        ],
    },
    { name: "Analysis", href: "/analysis", icon: ChartPieIcon },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="h-full flex grow flex-col gap-y-8 overflow-y-auto border-r border-gray-200 bg-white pt-4">
            <div className="w-16 mx-auto mt-8">
                <Logo />
            </div>
            <nav className="flex flex-1 flex-col mr-2">
                <ul role="list" className="space-y-1">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            {!item.children ? (
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        pathname === item.href
                                            ? "bg-purple-50 rounded font-semibold"
                                            : "hover:bg-purple-50",
                                        "group flex gap-x-3 p-2 text-gray-700",
                                    )}>
                                    <item.icon
                                        aria-hidden="true"
                                        className="size-6 shrink-0 text-gray-400"
                                    />
                                    {item.name}
                                </Link>
                            ) : (
                                <Disclosure as="div">
                                    <DisclosureButton
                                        className={
                                            "hover:bg-purple-50 group flex w-full gap-x-3 rounded-md p-2 text-left text-gray-700"
                                        }>
                                        <item.icon
                                            aria-hidden="true"
                                            className="size-6 shrink-0 text-gray-400"
                                        />
                                        {item.name}
                                        <ChevronRightIcon
                                            aria-hidden="true"
                                            className="ml-auto size-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel as="ul" className="mt-1">
                                        {item.children.map((subItem) => (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.href}
                                                    className={classNames(
                                                        pathname === subItem.href
                                                            ? "bg-purple-50 rounded font-semibold"
                                                            : "hover:bg-purple-50",
                                                        "group flex gap-x-3 rounded p-2 pr-0 pl-4 text-left text-gray-700",
                                                    )}>
                                                    <subItem.icon
                                                        aria-hidden="true"
                                                        className="size-6 shrink-0 text-gray-400"
                                                    />
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}