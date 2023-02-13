const inputField = document.getElementById("inputField");
const output = document.getElementById("output");
const submitButton = document.getElementById("submitButton")

inputField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    output.innerHTML = "";
    onThisDay(inputField.value);
  }
});

submitButton.addEventListener("click", (event) => {
  output.innerHTML = "";
  onThisDay(inputField.value);
});

async function onThisDay(input){
  let today = new Date(input);
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  let response = await fetch( url,
    {
        headers: {
            'Authorization': '4e2f8af44bf29f7e35a34dce3af658b9',
            'Api-User-Agent': 'he1252647092@gmail.com'
        }
    }
  );
  response.json()
    .then(data => {
      data.births.forEach(element => {
        output.innerHTML += element.text
        output.innerHTML += ' - '
        output.innerHTML += element.year
        output.innerHTML += '<br><br>'
      });
    }).catch(console.error);
}