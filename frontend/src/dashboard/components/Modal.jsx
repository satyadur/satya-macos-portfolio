const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[540px] rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
