let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("My Leads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value); //myleads updated here
  localStorage.setItem("My Leads", JSON.stringify(myLeads));
  render(myLeads);
  inputEl.value = "";
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url); //myleads updated here
    localStorage.setItem("My Leads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(arr) {
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    content += `
            <li>
                <a href="${arr[i]}" target="_blank">
                ${arr[i]}
            </li>`;
  }
  ulEl.innerHTML = content;
}
