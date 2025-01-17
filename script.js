const currencyOne = document.getElementById('curr-one');
const currencyTwo = document.getElementById('curr-two');
const inputOne = document.getElementById('input-one');
const inputTwo = document.getElementById('input-two');

let { have, want, amount, newAmount, rate, checkCurrenciesSelected } = {
  have: '',
  want: '',
  amount: 0,
  newAmount: 0,
  rate: 0,
  checkCurrenciesSelected: () => {
    return currencyOne.value && currencyTwo.value ? true : false;
  },
};

const fetchData = async () => {
  const apiKey = 'bWbwxDdtS9Bzsouymirguw==uZhWEMRD79j4eKVg';
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_qzfbQmDcpUcEM0uUnqewmns7EoTDtLA9C30pSRXt&currencies=${want}&base_currency=${have}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

currencyOne.addEventListener('change', async (e) => {
  have = e.target.value;

  if (checkCurrenciesSelected()) inputOne.disabled = false;
  else inputOne.disabled = true;
});

currencyTwo.addEventListener('change', async (e) => {
  want = e.target.value;

  const { data } = await fetchData();
  rate = parseFloat(data[want]).toFixed(2);

  if (checkCurrenciesSelected()) inputOne.disabled = false;
  else inputOne.disabled = true;
});

inputOne.addEventListener('input', (e) => {
  let userInput = parseFloat(e.target.value);
  console.log(userInput);

  if (isNaN(userInput)) {
    userInput = 0;
    inputOne.value = '';
  }

  amount = userInput;

  newAmount = amount * rate;

  console.log('amount: ' + amount);
  console.log('new: ' + newAmount);

  inputTwo.value = newAmount;
});
