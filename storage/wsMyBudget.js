let wsMyBudget ={
    showBudget(p1){
        return `
        <div class="col-12 text-center">
            <h5>Budget available</h5>
            <h1>${p1.value}</h1>
        </div>

        <div class="col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center incon">
            <h4 class="px-5">Income</h4>
            <h4 class="px-5">${p1.income.value}</h4>
        </div>
        <div class="col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center expen">
            <h4 class="px-5">Expenses</h4>
            <h4 class="px-5">${p1.expense.value}</h4>
        </div>

        `
    },
    /* showInputBudget(p1){
        return `
        <div id="input" class="px-3">
        <select name="symbol" id="">
            <option name="positive" value="positive">+</option>
            <option name="negative" value="negative">-</option>
        </select>
        </div>
        <div class="col-2">
            <input name="text" type="text" class="form-control" placeholder="Disabled input">
            
        </div>
        <div class="px-3">
            <input name="worth" type="number" class="form-control" placeholder="input">
        </div>
        <button type="submit" value="datos" class="btn btn-primary">Submit</button>

        `
    }, */
    showTablaBudget(p1){
        return `
        <div class="col-12 sm-2 col-md-12 col-lg-6">
            <h3>Incomes</h3>
            <table class="table">
                <tbody>
                ${p1.income.datos.map((val, id)=> {return `
                <tr>
                    <td>${val.text} </td> 
                    <td>${val.worth}</td>
                </tr>`}).join("")}
                </tbody>
            </table>
        </div>
        <div class="col-12 col-md-12 col-lg-6">
            <h3>Expenses</h3>
            <table class="table">
                <tbody>
                ${p1.expense.datos.map((val, id)=> {return `
                <tr>
                    <td>${val.text} </td> 
                    <td>${val.worth}</td>
                    <td>${p1.expense.porcentajes[id]}</td>
                </tr>`}).join("")}
                </tbody>
            </table>
        </div>

        `
    },
};
self.addEventListener("message", (e)=>{
    postMessage(wsMyBudget[`${e.data.module}`](e.data.data));
})