import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const callToastify = (message, isError) => {
    const toastStyle = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    if (isError) {
        return toast.error(message, toastStyle)
    }
    return toast.dark(message, toastStyle);
}

export default callToastify