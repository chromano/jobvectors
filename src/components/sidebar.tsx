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
                current: false,
            },
        ],
    },
    { name: "Analysis", href: "/vectors/analysis", icon: ChartPieIcon },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line
export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();

    return (
        <div className="h-full flex grow flex-col gap-y-8 overflow-y-auto pt-4">
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
                                            ? "bg-purple-800 dark:bg-purple-200 dark:text-purple-800 text-white font-semibold"
                                            : "hover:bg-purple-100 dark:hover:text-purple-800 dark:text-gray-300 hover:dark:text-gray-800",
                                        "group flex gap-x-3 p-1 pl-2 rounded",
                                    )}>
                                    <item.icon
                                        aria-hidden="true"
                                        className={
                                            "size-6 shrink-0 " +
                                            (item.href === pathname
                                                ? "text-white dark:text-purple-800"
                                                : "text-gray-400 group-hover:dark:text-purple-800")
                                        }
                                    />
                                    {item.name}
                                </Link>
                            ) : (
                                <Disclosure
                                    as="div"
                                    defaultOpen={item.children.some(
                                        (child) => child.href === pathname,
                                    )}>
                                    <DisclosureButton
                                        className={
                                            "hover:bg-purple-100 group flex w-full gap-x-3 rounded-md p-1 pl-2 text-left text-gray-700 dark:text-gray-300 hover:dark:text-purple-800 hover:text-gray-800"
                                        }>
                                        <item.icon
                                            aria-hidden="true"
                                            className="size-6 shrink-0 text-gray-400 group-hover:dark:text-purple-800"
                                        />
                                        {item.name}
                                        <ChevronRightIcon
                                            aria-hidden="true"
                                            className="ml-auto size-5 shrink-0 text-gray-400 group-hover:dark:text-purple-800 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel as="ul" className="mt-1 space-y-1">
                                        {item.children.map((subItem) => (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.href}
                                                    className={classNames(
                                                        pathname === subItem.href
                                                            ? "bg-purple-800 text-white rounded font-semibold dark:bg-purple-200 dark:text-purple-800"
                                                            : "hover:bg-purple-100 hover:dark:text-purple-800 dark:text-gray-300",
                                                        "group flex gap-x-3 rounded p-1 pr-0 pl-8 text-left text-gray-700 ",
                                                    )}>
                                                    <subItem.icon
                                                        aria-hidden="true"
                                                        className={
                                                            "size-6 shrink-0 " +
                                                            (pathname === subItem.href
                                                                ? "text-white dark:text-purple-800"
                                                                : "text-gray-400 group-hover:dark:text-purple-800")
                                                        }
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
