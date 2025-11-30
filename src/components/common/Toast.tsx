
interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => (
  <div className="bg-black/70 text-white px-6 py-3 rounded-xl text-sm shadow-lg">
    {message}
  </div>
);

export default Toast;
