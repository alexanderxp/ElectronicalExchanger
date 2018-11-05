const engine = () => {
    fetch('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD')
        .then(response => response.json())
        .then(element => {
            for (let i = 0; i < element.length; i++) {
                console.log(element[i]); // здесь элементы первого уровня
                for (let j in element[i]) {
                    if (typeof (element[i][j]) == 'object') {
                        for (let k in element[i][j]) {
                            console.log(k); // здесь элементы второго уровня
                            if (typeof (element[i][j]) == 'object') {
                                for (let l in element[i][j][k]) {
                                    console.log(l); // здесь элементы третьего уровня
                                }
                            } else {
                                console.log(element[i][j][k]) 
                            }
                        }
                    } else {
                        console.log(element[i][j]);
                    }
                }
            }
        });
}
