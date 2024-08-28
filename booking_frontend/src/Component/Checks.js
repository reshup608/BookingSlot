import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function isEmpty(txt){
    if(txt.length===0)
    {
      return true
    }
    else{
        return false
    }
}


function isAlphabets(txt){
    if(/^[a-z A-Z]+/.test(txt))
    {
      return true
    }
    else{
        return false
    }
}

function isEmail(txt)
 {
   if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/.test(txt))
    {
       return true
    }
    else
    {return false}
}

function isDigits(txt){
    if(/^[0-9]+/.test(txt))
    {
      return true
    }
    else{
        return false
    }
}

function isValidDate(txt){
  return !isNaN(Date.parse(txt))
}

function errorMessage(message) {
    toast.error(`🐞 ${message}`, {
     position: "top-right",
     autoClose: 10000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
}

function successMessage(message) {
    toast.success(`${message}`, {
     position: "top-right",
     autoClose: 10000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
}
export {isEmpty,isEmail,isAlphabets,errorMessage,isDigits,successMessage,isValidDate}