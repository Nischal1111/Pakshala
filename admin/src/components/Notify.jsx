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

