import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import Loading from "@/components/loading";

export default function Pagination({
    page,
    items,
    itemsPerPage,
}: {
    page: number;
    items: any;
    itemsPerPage: number;
}) {
    const entries = items;
    const totalItems = entries.count;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const onSwitchPage = (event: any, page: number) => {
        event.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("page", page.toString());
        startTransition(() => {
            router.push("?" + currentParams.toString());
        });
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
            {isPending && <Loading />}
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    onClick={(event) => onSwitchPage(event, Math.max(0, page - 1))}
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </Link>
                <Link
                    onClick={(event) =>
                        onSwitchPage(
                            event,
                            Math.min(Math.floor(totalItems / itemsPerPage), page + 1),
                        )
                    }
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{itemsPerPage * page + 1}</span> to{" "}
                        <span className="font-medium">
                            {Math.min(totalItems, itemsPerPage * (page + 1))}
                        </span>{" "}
                        of <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <Link
                            onClick={(event) => onSwitchPage(event, Math.max(0, page - 1))}
                            href="#"
                            className={
                                "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" +
                                (page === 0 ? "pointer-events-none cursor-default" : "")
                            }
                            aria-disabled={page === 0}
                            tabIndex={page === 0 ? -1 : undefined}>
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon aria-hidden="true" className="size-5" />
                        </Link>
                        {Array(Math.ceil(totalItems / itemsPerPage))
                            .fill(0)
                            .map((_, idx) => (
                                <Link
                                    onClick={(event) => onSwitchPage(event, idx)}
                                    key={idx}
                                    href={"?page=" + idx}
                                    className={
                                        "inline-flex relative items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 " +
                                        (page === idx
                                            ? "bg-purple-800 text-white"
                                            : "text-gray-900 hover:text-purple-800")
                                    }>
                                    {idx + 1}
                                </Link>
                            ))}
                        <Link
                            onClick={(event) =>
                                onSwitchPage(
                                    event,
                                    Math.min(Math.floor(totalItems / itemsPerPage), page + 1),
                                )
                            }
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="size-5" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
