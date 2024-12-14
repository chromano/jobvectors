import { Dialog, DialogPanel } from "@headlessui/react";
// eslint-disable-next-line
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
    children,
    onClose,
    isOpen,
}: {
    children: React.ReactNode;
    onClose: any;
    isOpen: boolean;
}) {
    return (
        <AnimatePresence>
            <Dialog open={isOpen} onClose={() => onClose(null)} className="relative z-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30"
                />

                <div className="fixed -top-40 inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        as={motion.div}
                        className="max-w-lg space-y-8 rounded border-2 border-purple-800 bg-white p-4">
                        {children}
                    </DialogPanel>
                </div>
            </Dialog>
        </AnimatePresence>
    );
}