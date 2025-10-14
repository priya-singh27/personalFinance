import LatestTransaction from "./LatestTransaction";
import MainHeader from "./MainHeader";

export default function Main(){
    return(
        <div className="bg">
            <MainHeader/>
            <LatestTransaction/>
        </div>
    )
}