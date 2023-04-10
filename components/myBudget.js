import config from "../storage/config.js";

let information = document.querySelector("#input");
let counterIncome = 0;
let counterExpenses = 0; 
let available = 0;
let porcentTotal = 0;

export default{
    
    
    showMyBudget(){
      config.dataMyBudget();
      Object.assign(this, JSON.parse(localStorage.getItem("myBudget")));
      const ws = new Worker("storage/wsMyBudget.js", {type:"module"});
      let id = [];
      let count = 0;
      id.push("#hed");
      ws.postMessage({module: "ShowBudget", data: this.article});
      id.push("#formu");
      ws.postMessage({module: "ShowFormBudget", data: this.article});
      id.push("#tabla");
      ws.postMessage({module: "ShowTableBudget", data: this.article});
      ws.addEventListener("message", (e)=>{
          let doc = new DOMParser().parseFromString(e.data, "text/html");
          
          document.querySelector(id[count]).append(...doc.body.children);
          (id.length-1==count) ? ws.terminate() : count++;
      })
      information.addEventListener("submit", (e)=>{


        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
       
        if(data.symbol == "+"){
            counterIncome = counterIncome + parseInt(data.worth);
            this.article.income.datos.unshift(data);
            this.article.income.value = counterIncome;
             
        }else{
            counterExpenses = counterExpenses - parseInt(data.worth);
            let calculoPorcents = "";
            this.article.expenses.info.map((val,id)=>{
                val.porcents = [];
                val.datos.unshift(data.worth)
                val.datos.map((val2,id)=>{
                    calculoPorcents = parseInt(-(parseInt(val2)*100)/counterExpenses);
                    val.porcents.push(calculoPorcents)
                })
            })
            
            this.article.expenses.datos.unshift(data);
            this.article.expenses.value = counterExpenses;         
        };
        
        available = counterIncome - (-counterExpenses);
        this.article.value = available;
        porcentTotal = -(100*counterExpenses)/counterIncome;
        this.article.expenses.porcent = parseInt(porcentTotal);
        information.reset();
        
        const ws = new Worker("storage/wsMyBudget.js", {type:"module"});
        let id = [];
        let count = 0;
        id.push("#hed");
        ws.postMessage({module: "ShowBudget", data: this.article});
        id.push("#tabla");
        ws.postMessage({module: "ShowTableBudget", data: this.article});
        
        ws.addEventListener("message", (e)=>{
            
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==count) ? ws.terminate() : count++;
        })
        localStorage.setItem("myBudget", JSON.stringify(this));
        }) 
    },   
}