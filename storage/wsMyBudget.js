let wsMyBudget ={
    showBudget(p1){
        return `
        <div class="col-12 text-center">
            <h5>${p1.tittle}</h5>
            <h1>${p1.sub}</h1>
        </div>

        <div class="col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center incon">
            <h4 class="px-5">${p1.title}</h4>
            <h4 class="px-5">${p1.subb}</h4>
        </div>
        <div class="col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center expen">
            <h4 class="px-5">${p1.titlee}</h4>
            <h4 class="px-5">${p1.subc}</h4>
        </div>

        `
    },
};
self.addEventListener("message", (e)=>{
    postMessage(wsMyBudget[`${e.data.module}`](e.data.data));
})