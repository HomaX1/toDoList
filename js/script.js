$(document).ready(function () {

    $.get("../restore.json", (data, status) => {

        let categoryUl = $('.category');
        let tasksUl = $('.tasks');

        for (let i = 0; i < data.length; ++i) {

            let categoryLi = document.createElement('li');

            categoryLi.innerHTML = data[i].name;
            categoryUl.append(categoryLi);

            categoryLi.onclick = () => {
                tasksUl.css('visibility', 'visible');
                $('.tasks li').hide();

                for (let j = 0; j < data[i].list.length; ++j) {
                    let tasksLi = document.createElement('li');
                    tasksLi.innerHTML = data[i].list[j];
                    tasksUl.append(tasksLi);
                }

            };
        }

        /* console.log("\nStatus: " + status);*/
    });

});



