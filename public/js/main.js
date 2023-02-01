let itemArr = document.querySelectorAll(".items");
itemArr.forEach((x) => x.addEventListener("click", markComplete));

let completedArr = document.querySelectorAll('.completed')
completedArr.forEach(el => el.addEventListener('click', markUncomplete))

let trashArr = document.querySelectorAll('.fa-trash')
trashArr.forEach(el => el.addEventListener('click', deleteItem))

async function markComplete() {
  const item = this.parentNode.childNodes[1].innerText;

  try {
    const response = await fetch("markCompleted", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: item,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}


async function markUncomplete(){
    const item = this.parentNode.childNodes[1].innerText;

    try {
      const response = await fetch("markUncompleted", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: item,
        }),
      });
      const data = await response.json();
      console.log(data);
      location.reload();
    } catch (err) {
      console.log(err);
    }
}


async function deleteItem(){
    const item = this.parentNode.childNodes[1].innerText;
    console.log(item)
    try{
        const response = await fetch ('/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: item
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
    

}