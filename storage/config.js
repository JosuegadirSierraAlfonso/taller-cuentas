export default{
    dataMyBudget(){
        localStorage.setItem("myBudget", JSON.stringify({
            article:{
                value: "",

                income:{
                    value:"",
                    datos: [
        
                    ]
                },
                expense:{
                    value:"",
                    porcentaje: "",
                    datos1:[],
                    porcentajes: [

                    ],
                    datos: [
                        
                        
        
                    ]
                }

            }
        }))
    },
}