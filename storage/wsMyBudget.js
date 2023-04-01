let wsMyBudget = {
    ShowBudget(p1) {
            return `
            <div class="col-12 text-center text-white">
                <h3>Budget available</h3> 
                <h1 class="pb-3">$ ${p1.value}</h1>
            </div>
            <div class="col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center text-white incon">
                <h4>INCOME</h4>
                <h4>$${p1.income.value}</h4>
            </div>  
            <div class="col-12 w-25 p-3 d-flex  justify-content-between justify-content-center text-white expen">
                <h4>EXPENSE</h4>
                <h4>$${p1.expenses.value} ${p1.expenses.porcent}%</h4>
            </div>
            `        
    },
    ShowFormBudget(p1) {
        return `
        <div class="col-2 ">
            <select name="symbol" id="">
                <option name="positivo" alue="positivo">+</option>
                <option name="negativo" value="negativo">-</option>
            </select>
        </div>
        <div class="col-4">
            <input name="texto" type="text" id="disabledTextInput" class="form-control" placeholder="Enter payment">
        </div>
        <div class="px-3">
            <input name="worth" type="number" id="disabledNumberInput" class="form-control" placeholder="Enter amount">
        </div>
        <button type="submit" class="btn btn-light">Submit</button>

        `        
    },
      ShowTableBudget(p1){
        return `
        <div class="col-12 col-md-6 w-25 p-5">
            <div class="d-flex justify-content-between">
                <table class="table">
                    <thead>
                        <th>INCOME</th>
                    </thead>
                    <tbody>
                        ${p1.income.datos.map((val, id)=> {return `<tr><td>${val.texto} </td><td class="col-2">+$${val.worth}</td></tr>`}).join("")}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-12 col-md-6 w-25 p-5">
            <div class="d-flex justify-content-between">
                <table class="table">
                    <thead>
                        <th>EXPENSES</th>
                    </thead>
                    <tbody>
                        ${p1.expenses.datos.map((val, id)=> {return `<tr><td>${val.texto} </td> <td class="col-2">-$${val.worth}</td>${p1.expenses.info.map((val,id2)=>{return `<td>${val.porcents[id]}%</td>`})}</tr>`}).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `
      },
        

}
self.addEventListener("message", (e)=>{
    postMessage(wsMyBudget[`${e.data.module}`](e.data.data));
})