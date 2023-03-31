import config from "../storage/config.js";
export default{
    showMyBudget(){
      config.dataMyBudget();
      Object.assign(this, JSON.parse(localStorage.getItem("myBudget")));
      const ws = new Worker("storage/wsMyBudget.js", {type:"module"});
      let id = [];
      let count = 0;
      id.push("#hed");
      ws.postMessage({module: "showBudget", data: this.article});
      ws.addEventListener("message", (e)=>{
          let doc = new DOMParser().parseFromString(e.data, "text/html");
          console.log(e.data);
          document.querySelector(id[count]).append(...doc.body.children);
          (id.length-1==count) ? ws.terminate() : count++;
      })
    },
}