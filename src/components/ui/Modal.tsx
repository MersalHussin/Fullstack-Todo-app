// src/components/ui/Modal.tsx

// ١. نتأكد من استيراد أنواع React مثل RefObject و ReactNode
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, type ReactNode } from 'react';


interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactNode; // استخدام ReactNode هو الأفضل للـ children
  initialFocus?: React.RefObject<HTMLInputElement | null>;
}

// ٢. نحدد نوع المكون كـ React.FC (Function Component) ونمرر له IProps
const Modal: React.FC<IProps> = ({ isOpen, closeModal, title, children, initialFocus }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        initialFocus={initialFocus}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm"  />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                   <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                     {title}
                   </Dialog.Title>
                )}
               
                <div className="mt-4">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;