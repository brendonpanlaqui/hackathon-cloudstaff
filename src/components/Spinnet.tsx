import "../App.css"
export default function Spinner(){
    return(
    <div className="flex bg-[#0F172B] h-screen justify-center place-items-center">
    <span className="loader"></span>
    <span className="loader2 mt-20 -ms-16"></span>
    </div>)
}