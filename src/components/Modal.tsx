import ReactDOM from "react-dom";
import React from "react";
import { MoreVertical, X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center sm:px-0">
      <div className="bg-white rounded-xl w-full sm:max-w-lg relative shadow-lg max-h-[95vh] overflow-y-auto">
        {/* Botón de cerrar y 3 puntitos visible solo en desktop */}
        <button
          onClick={onClose}
          className="hidden sm:flex bg-white p-2 rounded-full absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <MoreVertical className="absolute top-[165px] right-5 w-6 h-6 text-[#808C73] cursor-pointer" />
        {children}
      </div>
    </div>
  );
};
