import {toast,Bounce} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => {
    const addnotify=()=>{
        toast.success("Added Successfully", {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return addnotify()
}
export const lognotify = () => {
    const addnotify=()=>{
        toast.info("Logged In Successfully !!!", {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return addnotify()
}
export const Outnotify = () => {
    const addnotify=()=>{
        toast.info("Logged Out Successfully !!!", {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return addnotify()
}
export const Marknotify = () => {
    const addnotify=()=>{
        toast.success("Order is Completed !!!", {
position: "top-right",
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
    return addnotify()
}
export const Infonotify = () => {
    const infonotify=()=>{
       toast.info("Please add a image to upload !!!", {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return infonotify()
}
export const booknotify = () => {
    const booknotify=()=>{
       toast.info("Booking Confirmed !!!", {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return booknotify()
}

