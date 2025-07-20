let amountInp = document.querySelector("#amountInp");
let answerInp = document.querySelector("#answerDiv input");
let firstSection = document.querySelector("#firstSection");
let secondSection = document.querySelector("#secondSection");
let exchangeBtn = document.querySelector("#exchangeBtn");
let currencyNames = [];
let exchangeRate = null;
fetch("https://v6.exchangerate-api.com/v6/55b773f2d8888bfcc1207677/latest/AZN")
  .then((res) => res.json())
  .then((res) => {
    // Push currency names
    for (let key in res.conversion_rates) {
      currencyNames.push(key);
    }
    currencyNames.forEach((element) => {
      firstSection.innerHTML += `<option value="${element}">${element}</option>`;
      secondSection.innerHTML += `<option value="${element}">${element}</option>`;
    });
  });

// Valyuta dəyişdikdə kurs məzənnəni al
let fetchRate =() => {
  if (firstSection.value && secondSection.value) {
    fetch(
      `https://v6.exchangerate-api.com/v6/55b773f2d8888bfcc1207677/latest/${firstSection.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        exchangeRate = res.conversion_rates[secondSection.value];
        calculateAmount();
      })
      .catch((err) => console.log(err));
  }
};

// Məzənnəyə əsasən cavabı hesabla
let calculateAmount =() => {
  let amountStr = amountInp.value.trim();
  if(amountStr===""){
    answerInp.value=""; //İnput boş olduqda cavabı sıfırla
    return;
  }
    let amount = parseFloat(amountStr);

     if (!isNaN(amount) && exchangeRate !== null) {
      answerInp.value = (amount * exchangeRate).toFixed(2);
    } else {
      answerInp.value = "";
    };
};

// Məzənnənin yerlərini dəyiş
exchangeBtn.addEventListener("click",(e)=>{
  e.preventDefault()
 if(exchangeRate !== null){
  let spareFirstSection=firstSection.value;
  firstSection.value=secondSection.value;
  secondSection.value=spareFirstSection;
  fetchRate();
 }
})
amountInp.addEventListener("keyup", calculateAmount);
firstSection.addEventListener("change", fetchRate);
secondSection.addEventListener("change", fetchRate);