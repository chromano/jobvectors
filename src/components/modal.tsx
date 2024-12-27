import { Dialog, DialogPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
    children,
    onClose,
    isOpen,
    size = "w-1/2",
}: {
    children: React.ReactNode;
    onClose: any;
    isOpen: boolean;
    size: string;
}) {
    return (
        <AnimatePresence>
            <Dialog open={isOpen} onClose={() => onClose(null)} className="relative z-50 h-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white/80 dark:bg-gray-800/80"
                />

                <div className="fixed w-full top-0 h-full md:h-auto md:-top-40 inset-0 flex items-center justify-center md:p-4">
                    <DialogPanel
                        as={motion.div}
                        className={`w-full h-full md:h-auto md:w-auto md:${size} space-y-4 rounded md:border-2 border-purple-800 dark:border-purple-200 bg-white dark:bg-gray-900 p-4`}>
                        {children}
                    </DialogPanel>
                </div>
            </Dialog>
        </AnimatePresence>
    );
}
