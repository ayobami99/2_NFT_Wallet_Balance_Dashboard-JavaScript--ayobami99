// Set your API key here
const APIKEY = 'ckey_3d2df33e49c146249119f506dfd';

function getData() {
    // Get key HTML elements and reset table content
    const ul = document.getElementById('metadata');
    const spinner = document.getElementById("spinner");
    const total = document.getElementById("total");
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    ul.innerHTML = "";
    total.innerHTML = "";
    spinner.classList.add("show");

    // Covalent API request setup
    const address = document.getElementById('address').value || 'demo.eth';
    const url = new URL(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2`);
    url.search = new URLSearchParams({
        key: APIKEY,
        nft: true
    })

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        spinner.classList.remove("show");
        let tokens = data.data.items;
        // Update wallet metadata
        ul.innerHTML = 
            `<li> Wallet address: ${data.data.address} </li>` +
            `<li> Last update: ${data.data.updated_at} </li>`;
        total.innerHTML = `Balance: 0`;
        return tokens.map(function(token) { // Map through the results and for each run the code below
        if (token.contract_name === 'Rarible') {
            console.log(token);
            total.innerHTML = `Balance: ${token.nft_data.length}`;
            token.nft_data.forEach(function(nft) {
                tableRef.insertRow().innerHTML = 
                `<td><img src=${nft.external_data.image} style=width:100px;height:100px;></td>` +
                `<td> ${nft.token_id} </td>` +
                `<td> ${nft.external_data.name} </td>`  +
                `<td> ${nft.external_data.description} </td>` +
                `<td><a href=${nft.external_data.external_url} target='_blank'>More Details</a> </td>`;
            });
        }
        })
    })
}


