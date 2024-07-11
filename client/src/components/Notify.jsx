import {toast,Bounce} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const donenotify = () => {
    const donenotify=()=>{
        toast.success("Order Placed Successfully !!!", {
position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
color:"orange",
transition: Bounce,
className: 'toast-custom',
progressClassName: 'toast-custom-progress',
});
    }
    return donenotify()
}

