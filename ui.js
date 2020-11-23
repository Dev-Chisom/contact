const contactOutput = document.querySelector(".output");
const search = document.querySelector(".search");
const container = document.querySelector(".container");

let data;
let searchContact = "";


const myFetch = (() => {
  return {
      
    getData: async () => {
      let response = await fetch(
        "https://emajency.com/js/numbers.json"
      );
      data = await response.json();
    },
  };
})();


const ui = (() => {
  return {
    renderUI: async () => {
      try {
     document.body.classList = 'loading'
        await myFetch.getData();
        let output = "";
        data
          .filter((contact) => contact.name.toLowerCase().includes(searchContact.toLowerCase()))
          .forEach((contact) => {
            output += `
            <div class="contact">
            <div class="card">
            <div class="box">
            <div class="content">
              <h1>${contact.name}</h1>
              <div class="tel"><a href="tel:+234(${contact.number.charAt(
                0
              )})${contact.number.substring(1)}"><i class="fas fa-phone"></i></a></div>
            </div>
            </div>
            </div>
            </div>
          `;
          });
        contactOutput.innerHTML = output;
        document.body.className='';
      } catch (error) {
        const div = document.createElement("div");
        div.className = "contact--error";
        const para = document.createElement("p");
        para.innerHTML = `<i class="fas fa-exclamation-circle"></i> An Error Occured While Fetching Data from Server`;
        div.appendChild(para);
        container.appendChild(div);
      }
    },
  };
})();

ui.renderUI();

search.addEventListener("input", (e) => {
  searchContact = e.target.value;

  ui.renderUI();
});