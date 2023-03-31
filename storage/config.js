export default{
    dataMyBudget(){
        localStorage.setItem("myBudget", JSON.stringify({
            article:{
                tittle: "Budget available",
                title:"Income",
                titlee:"Expenses",
                sub: "$$$$$",
                subb:"$$$$$",
                subc:"$$$$$",
            }
        }))
    },
}