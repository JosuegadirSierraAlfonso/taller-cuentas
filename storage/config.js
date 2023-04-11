export default{
    dataMyBudget(){
        const data = {
            article:{     
                value: "",
                income: {                 
                    value:"",
                    info:[{
                        datos:[
                        ],
                        porcents: [
                        ],
                        names: [
                        ]
                    }
                    ],
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
                        ],
                        names: [
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