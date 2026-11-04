interface ModalProps {
  title: string;
  onClose: () => void;
  action?: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, action, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-[#0E2237]/35" />

      {/* modal */}
      <div className="relative z-10 bg-white rounded-xl p-4 min-w-2/4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button className="pointer" onClick={() => onClose()}>
            X
          </button>
        </div>

        {/* body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
