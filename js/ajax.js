$.get("../restore.json", (data, status) => {

    let categoryUl = $('.category');

    for (let i = 0; i < data.length; ++i) {
        let newLi = document.createElement('li');
        newLi.innerHTML = data[i].name;
        categoryUl.append(newLi);
    }

   /* console.log("\nStatus: " + status);*/
});



