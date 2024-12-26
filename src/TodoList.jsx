import React , {useState, useEffect}from "react";
import './TodoList.css';
import Icone from './assets/Icon.webp'


function TodoList(){

    const listaStorage = localStorage.getItem('Lista');
    const[lista,setLista]= useState(listaStorage? JSON.parse(listaStorage): []);
    const [novoItem, setNovoItem] = useState("");
    
useEffect(()=>{
localStorage.setItem('Lista', JSON.stringify(lista));
}, [lista])

function adicionaItem(form){
    form.preventDefault();
    if(!novoItem)
    {
        return;
    }
    setLista([...lista,{text:novoItem, isCompleted: false}]);
setNovoItem("");
document.getElementById('inputEntrada').focus();
}

function clicou(index){
const listaaux = [...lista];
listaaux[index].isCompleted = !listaaux[index].isCompleted;
setLista(listaaux);
}
function deleta(index){
    const listaaux = [...lista];
    listaaux.splice(index,1);
    setLista(listaaux);
    }
   
    function deletatudo(){
        setLista([]);
    }


    return(
        <div>
    <h1>Lista De Tarefas</h1>
    <form onSubmit={adicionaItem}>
<input value={novoItem} id="inputEntrada" onChange={(e)=>{setNovoItem(e.target.value)}} type="text" placeholder="Adicione uma tarefa"/>
<button  className= "add" type="submit">Add</button>
    </form>
    <div className="listatarefas">
    <div style={{textAlign:'center'}}>
        {
            lista.length<1
            ?
<img src = {Icone} className="icone-central"/> 
             :
             lista.map((item,index)=>(
                <div key={index} className ={item.isCompleted ? "item-completo" : "item"}>
                <span onClick={()=>{clicou(index)}}>{item.text}</span>
                <button className="dell" onClick={()=>{deleta(index)}}>Deletar</button>
            </div>
             ))

        }
    

               {
                lista.length> 0 && <button onClick={()=>{deletatudo()}} className="deleteall" >Deletar Todas</button>
               }
        
    </div>
    </div>
    </div>
    )
}
export default TodoList