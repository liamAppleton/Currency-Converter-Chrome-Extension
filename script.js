const currencyOne = document.getElementById('curr-one');
const currencyTwo = document.getElementById('curr-two');
const inputOne = document.getElementById('input-one');
const inputTwo = document.getElementById('input-two');
const swapBtn = document.getElementById('swap-btn');

let { have, want, amount, newAmount, rate } = {
  have: '',
  want: '',
  amount: 0,
  newAmount: 0,
  rate: 0,
};

const checkCurrenciesSelected = () => {
  if (currencyOne.value && currencyTwo.value) {
    inputOne.disabled = false;
    inputOne.classList.add('input-one-active');
  } else {
    inputOne.disabled = true;
    inputOne.classList.remove('input-one-active');
  }
};

const handleCurrencySwap = async () => {
  let temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  have = currencyOne.value;
  want = currencyTwo.value;

  temp = inputOne.value;
  inputOne.value = inputTwo.value;
  inputTwo.value = temp;

  const { data } = await fetchData();
  rate = parseFloat(data[want]);
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

currencyOne.addEventListener('change', (e) => {
  have = e.target.value;

  checkCurrenciesSelected();
});

currencyTwo.addEventListener('change', async (e) => {
  want = e.target.value;

  const { data } = await fetchData();
  rate = parseFloat(data[want]);

  checkCurrenciesSelected();
});

inputOne.addEventListener('input', (e) => {
  let userInput = e.target.value;
  // prevent user from entering more than 2 dp
  if (userInput.match(/^.*\.\d{3,}$/)) {
    e.target.value = userInput.substring(0, userInput.length - 1);
  }
  userInput = parseFloat(e.target.value).toFixed(2);
  // prevent user from entering negative numbers
  if (isNaN(userInput)) {
    userInput = 0;
    inputOne.value = '';
  }

  amount = userInput;
  newAmount = amount * rate;
  inputTwo.value = newAmount.toFixed(2);
});

swapBtn.addEventListener('click', handleCurrencySwap);
