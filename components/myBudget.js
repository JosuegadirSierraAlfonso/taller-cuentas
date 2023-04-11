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

            let calculoPorcents = "";
            this.article.income.info.map((val,id)=>{
                val.porcents = [];
                val.datos.unshift(data.worth)
                val.names.unshift(data.texto);
                val.datos.map((val2,id)=>{
                    calculoPorcents = parseInt(+(parseInt(val2)*100)/counterIncome);
                    val.porcents.push(calculoPorcents)
                })
            })


            this.article.income.datos.unshift(data);
            this.article.income.value = counterIncome;
             
        }else{
            counterExpenses = counterExpenses - parseInt(data.worth);
            let calculoPorcents = "";
            this.article.expenses.info.map((val,id)=>{
                val.porcents = [];
                val.datos.unshift(data.worth)
                val.names.unshift(data.texto);
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
        });




        const getOptionChart1 = () => {
            return {
                title: {
                    text: "Income graph",
                  },
                xAxis: {
                  type: "category",
                  data: this.article.income.info[0].names,
                },
                yAxis: {
                  type: "value"
                },
                series: [
                  {
                    data: this.article.income.info[0].porcents,
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                      color: "rgba(180, 180, 180, 0.2)",
                    },
                  }
                ]
              };
        };
        const initCharts1 = () => {
            const chart = echarts.init(document.querySelector("#chart1"));
            
            chart.setOption(getOptionChart1());

        };





        const getOptionChart = () => {
            return {
                title: {
                    text: "expense graph",
                  },
                xAxis: {
                  type: "category",
                  data: this.article.expenses.info[0].names,
                },
                yAxis: {
                  type: "value"
                },
                series: [
                  {
                    data: this.article.expenses.info[0].porcents,
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                      color: "rgba(180, 180, 180, 0.2)",
                    },
                  }
                ]
              };
        };
        const initCharts = () => {
            const chart1 = echarts.init(document.querySelector("#chart2"));
            
            chart1.setOption(getOptionChart());

        };
        initCharts();
        initCharts1();

        localStorage.setItem("myBudget", JSON.stringify(this));
        }) 
    },   
}