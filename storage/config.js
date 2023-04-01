export default{
    dataMyBudget(){
        localStorage.setItem("myBudget", JSON.stringify({
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
        }))
    }
}