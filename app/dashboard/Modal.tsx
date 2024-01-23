// Modal.js
import React, { ReactNode } from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
  }
  
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,title }) => {
  if (!isOpen) return null;

  return (
    <>
    {isOpen && (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
          {/* Background overlay with fade effect */}
        </div>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                {title && (
                  <h3 className="text-lg font-semibold text-black flex-grow text-center">
                    {title}
                  </h3>
                )}
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
  );
};

export default Modal;
