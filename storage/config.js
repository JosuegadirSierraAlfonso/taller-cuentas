export default{
    dataMyBudget(){
        const data = {
            article:{     
                value: "",
                income: {                 
                    value: 
                    "",
                    datos: [
                    ]
                },
                expenses: {
                    value: "",
                    porcent: "",
                    info:[{
                        datos:[
                        ],
                        porcents: [
                        ]
                    }
                    ],  
                    datos: [       
                    ]
                }
            },
        }
        const value = localStorage.getItem("myBudget");
        if (!value) localStorage.setItem("myBudget", JSON.stringify(data));
    }
}