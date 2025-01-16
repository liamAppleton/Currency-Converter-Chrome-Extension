const currencyOne = document.getElementById('curr-one');
const currencyTwo = document.getElementById('curr-two');
const inputOne = document.getElementById('input-one');
const inputTwo = document.getElementById('input-one');

let { have, want, amount } = {
  have: '',
  want: '',
  amount: 0,
};

const apiKey = 'bWbwxDdtS9Bzsouymirguw==uZhWEMRD79j4eKVg';
const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${'GBP'}&want=${'AUD'}&amount=${5000}`;

const fetchData = async () => {
  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

currencyOne.addEventListener('change', (e) => {
  have = e.target.value;
});

currencyTwo.addEventListener('change', (e) => {
  want = e.target.value;
});
