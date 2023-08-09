document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "update") {
    const id = event.target.dataset.id;
    const li = event.target.closest("li");
    const liInnerHtml = li.innerHTML;
    const liTitle = li.querySelector("span").innerText;
    li.innerHTML = null;
    li.insertAdjacentHTML(
      "afterBegin",
      `<div class="d-flex justify-content-between align-items-center w-100">    
         <div >
            <input class="form-control" type="text" name="title"/>
         </div>
         <div>
           <button class="btn btn-success">Coxранить</button>
           <button class="btn btn-danger ms-1">Отменить</button>
          </div> 
       </div>`
    );
    const input = li.querySelector("input");
    input.value = liTitle;
    li.querySelector(".btn-success").addEventListener("click", () => {
      const title = input.value;
      li.innerHTML = null;
      li.insertAdjacentHTML("afterBegin", liInnerHtml);
      edit(id, title).then(() => {
        li.querySelector("span").innerText = title;
      });
    });
    li.querySelector(".btn-danger").addEventListener("click", () => {
      li.innerHTML = null;
      li.insertAdjacentHTML("afterBegin", liInnerHtml);
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title }),
  });
}
