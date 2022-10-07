let title = document.getElementById('title');
let price = document.getElementById('price')
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('TOTAL');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let search_title = document.getElementById('search_title');
let search_category = document.getElementById('search_category');
let mood = 'create';
let temp;
//get TOTAL
function get_total() {
    if (price.value != '') {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = ' rgb(35, 74, 35)'
    }
    else {
        total.style.background = 'rgb(50, 50, 116)'
    }

}

//create product
let data_product = []
create.onclick = function () {
    let new_product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value.toLowerCase(),
        total: (+price.value + +taxes.value + +ads.value) - +discount.value
    }
    if (mood === 'create') {
        //count
        if (new_product.count > 1) {
            for (var i = 0; i < new_product.count; i++) {
                data_product.push(new_product)
            }
        } else {
            data_product.push(new_product)
        }
        // ----------------

        console.log(data_product)
        show_data()
    }
    else {
        data_product[temp] = new_product
        show_data()
    }
    clear_data()

    create.innerHTML = "Create"
}
//------------------------------------

//clear inputs after click btn----------------
function clear_data() {
    price.value = ''
    title.value = ''
    taxes.value = ''
    price.value = ''
    ads.value = ''
    discount.value = ''
    count.value = ''
    category.value = ''
    total.innerHTML = 'TOTAL:'
    total.style.background = 'rgb(50, 50, 116)'
}
//----------------------

//save in local storage

//read

function show_data() {
    let table = '';
    for (let i = 0; i < data_product.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${data_product[i].title}</td>
        <td>${data_product[i].price}</td>
        <td>${data_product[i].taxes}</td>
        <td>${data_product[i].ads}</td>
        <td>${data_product[i].discount}</td>
        <td>${data_product[i].total}</td>
        <td>${data_product[i].count}</td>
        <td>${data_product[i].category}</td>
        <td><button onclick=update(${i}) id="update">update</button></td>
        <td><button onclick=delete_data(${i}) id="delete">delete</button></td>
        </tr>
        `;

    };
    document.getElementById('tbody').innerHTML = table;
    let delete_all = document.getElementById('delete_all')
    if (data_product.length > 0) {
        delete_all.innerHTML = `<button onclick=delete_all() id="create">Delete All (${data_product.length}) </button>`
    } else {
        delete_all.innerHTML = ''
    }


};
//delete
function delete_data(i) {
    data_product.splice(0, 1)
    show_data()
}
function delete_all() {
    data_product.splice(0)
    show_data()
}
//update
function update(i) {
    title.value = data_product[i].title;
    price.value = data_product[i].price;
    taxes.value = data_product[i].taxes;
    ads.value = data_product[i].ads;
    discount.value = data_product[i].discount;
    total.value = data_product[i].total;
    category.value = data_product[i].category;
    count.value = data_product[i].count;
    get_total()
    count.style.display = "none"
    create.innerHTML = "Update";
    mood = 'update'
    temp = i
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//search
let Search_Mood = "title";
function Search(id) {
    if (id == 'search_title') {
        Search_Mood = "title";
        search.placeholder = 'search by title';
        search.value='';
    } else {
        Search_Mood = "category";
        search.placeholder = 'search by category';
        search.value='';

    };
    search.focus();

}
function search_data(value) {
    let table = ''
    if (Search_Mood == 'title') {
        for (let i = 0; i < data_product.length; i++) {
            if (data_product[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${data_product[i].title}</td>
                <td>${data_product[i].price}</td>
                <td>${data_product[i].taxes}</td>
                <td>${data_product[i].ads}</td>
                <td>${data_product[i].discount}</td>
                <td>${data_product[i].total}</td>
                <td>${data_product[i].count}</td>
                <td>${data_product[i].category}</td>
                <td><button onclick=update(${i}) id="update">update</button></td>
                <td><button onclick=delete_data(${i}) id="delete">delete</button></td>
                </tr>
                `;
            } else {
                console.log("im not here");
            }
            document.getElementById('tbody').innerHTML = table;
        }
    }


    else {
        for (let i = 0; i < data_product.length; i++) {
            if(data_product[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${data_product[i].title}</td>
                <td>${data_product[i].price}</td>
                <td>${data_product[i].taxes}</td>
                <td>${data_product[i].ads}</td>
                <td>${data_product[i].discount}</td>
                <td>${data_product[i].total}</td>
                <td>${data_product[i].count}</td>
                <td>${data_product[i].category}</td>
                <td><button onclick=update(${i}) id="update">update</button></td>
                <td><button onclick=delete_data(${i}) id="delete">delete</button></td>
                </tr>
                `;
            }
        }
        document.getElementById('tbody').innerHTML=table;
    }}


//clean data 