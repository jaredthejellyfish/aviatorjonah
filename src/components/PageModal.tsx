"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface PageModalProps {
  children: React.ReactNode;
}

export default function PageModal({
  children,
}: PageModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Add animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  };

  useEffect(() => {
    // Store the element that had focus before opening modal
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Trap focus within modal
    const handleTabKey = (e: KeyboardEvent) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Close modal on escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscapeKey);

    // Prevent page scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Cleanup
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";

      // Restore focus to previous element when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [router]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.back();
        }
      }}
    >
      <div className="container mx-auto py-4 px-4">
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          className="bg-white dark:bg-neutral-900 rounded-lg px-6 overflow-y-auto h-[90vh] mt-16 relative"
          tabIndex={-1}
        >
          <div className="absolute top-6 right-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
