import config from "../storage/config.js";
let information = document.querySelector("#input");
let contadorIngresos = 0;
let contadorEgresos = 0; 
let disponible = 0;
let porcentajetotal = 0;

export default{
    showMyBudget(){
      config.dataMyBudget();
      Object.assign(this, JSON.parse(localStorage.getItem("myBudget")));
      const ws = new Worker("storage/wsMyBudget.js", {type:"module"});
      let id = [];
      let count = 0;
      id.push("#hed");
      ws.postMessage({module: "showBudget", data: this.article});
      id.push("#tabla");
      ws.postMessage({module: "showTablaBudget", data: this.article});

      ws.addEventListener("message", (e)=>{
          let doc = new DOMParser().parseFromString(e.data, "text/html");

          document.querySelector(id[count]).append(...doc.body.children);
          (id.length-1==count) ? ws.terminate() : count++;
      })
      information.addEventListener("submit", (e)=>{


        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
       
        if(data.symbol == "+"){
            contadorIngresos = contadorIngresos + parseInt(data.worth);
            this.article.income.datos.unshift(data);
            this.article.income.value = contadorIngresos;
             
        }else{
            contadorEgresos = contadorEgresos - parseInt(data.worth);
            this.article.expense.datos.unshift(data.worth);
            this.article.expense.datos1.map((val, id)=>{
                console.log(val);
                /* let porcentaje2 = -(100*val[id])/contadorEgresos;
                this.contenido.egresos.porcentajes.unshift(porcentaje2) */
            })
            this.article.expense.datos.unshift(data);
            this.article.expense.value = contadorEgresos; 
            
            
            
            
            
        };
        disponible = contadorIngresos - (-contadorEgresos);
        this.article.value = disponible;
        porcentajetotal = -(100*contadorEgresos)/contadorIngresos;
        this.article.expense.porcentaje = parseInt(porcentajetotal);
        information.reset();
        
        const ws = new Worker("storage/wsMyBudget.js", {type:"module"});
        let id = [];
        let count = 0;
        id.push("#hed");
        ws.postMessage({module: "showBudget", data: this.article});
        id.push("#tabla");
        ws.postMessage({module: "showTablaBudget", data: this.article});
        
        ws.addEventListener("message", (e)=>{
            
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==count) ? ws.terminate() : count++;
        })

        
        })
    },
}