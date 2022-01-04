import {useState} from "react"
import "./Slider.css"
import dataSlider from "./dataSlider"
import BtnSlider from "./BtnSlider"

export default function Slider() {

    const[slideAnim, setSlideAnim] = useState({
        index: 1,
        inProgress: false
    })

    const nextSlide = () => {
        if(slideAnim.index !== dataSlider.length && !slideAnim.inProgress){ //si 1 est différent de 5
            setSlideAnim({  //j'anime une première fois
                index: slideAnim.index+1,
                inProgress: true
            })

            setTimeout(() => { //à ce stade, la valeur du state est celui du passé
                setSlideAnim({index: slideAnim.index +1, inProgress: false})
            },400) //Au bout de 0.4 secondes, je peux recliquer
        }
        else if(slideAnim.index === dataSlider.length  && !slideAnim.inProgress){
            setSlideAnim({
                index: 1,
                inProgress: true
            })

            setTimeout(() => { //à ce stade, la valeur du state est celui du passé
                setSlideAnim({index: 1, inProgress: false})
            },400) //Au bout de 0.4 secondes, je peux recliquer
        }
    }

    const prevSlide = () => {
        if(slideAnim.index !== 1 && !slideAnim.inProgress){ //si 1 est différent de 5
            setSlideAnim({
                index: slideAnim.index-1,
                inProgress: true
            })

            setTimeout(() => { //à ce stade, la valeur du state est celui du passé
                setSlideAnim({index: slideAnim.index -1, inProgress: false})
            },400) //Au bout de 0.4 secondes, je peux recliquer
        }
        else if(slideAnim.index ===1  && !slideAnim.inProgress){
            setSlideAnim({
                index: dataSlider.length,
                inProgress: true
            })

            setTimeout(() => { //à ce stade, la valeur du state est celui du passé
                setSlideAnim({index: dataSlider.length, inProgress: false})
            },400) //Au bout de 0.4 secondes, je peux recliquer
        }
    }

    const moveDot = (index: number) =>  {
        setSlideAnim({index: index, inProgress: false})
    }

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => { //index: index des éléments du tableau qu'on parcoure
                return(
                    <div
                    key={obj.id} //il faut une clé unique pour react
                    className={slideAnim.index === index +1 ? "slide active-anim" : "slide" }
                    >
                    <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} alt="" /> {/* process : pour l'url en mode production*/}
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider  moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {/*on crée un nouveau tableau et on va itérer dedans grâce à map. On est obligé de mettre deux paramètres pour map pour avoir accès à index */}
                {Array.from({length: dataSlider.length}).map((item,index) => {
                     return <div className={slideAnim.index === index + 1 ? "dot active" :"dot"} 
                     onClick={() => moveDot(index+1)}> {/*on utilise une fonction anonyme car on lui passe des arguments et ça évite qu'elle s'exécute directement */}
                     </div>
                })}
            </div>
        </div>
    )
}
