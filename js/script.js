/*
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

 /!* console.log("\nStatus: " + status);*!/
 });

 });

 */

$(document).ready(function () {
    let storageCategory = [];
    let categoryUl = $('.category');
    let tasksUl = $('.tasks');

    let showCategory = (data) => {
        let allLi = "";
        storageCategory = data;

        for (let i = 0; i < storageCategory.length; i++) {
            allLi += "<li data-id-category='" + storageCategory[i].id + "'>" + storageCategory[i].name + "</li>";
        }

        categoryUl.append(allLi);
        categoryUl.find('li').on('click', showTasks);
    };

    /*data-lists='" + storageCategory[i].list + "'*/

    let btnAddCategory = $('.adding-form__button_category');
    let addCategory = (e) => {
        e.preventDefault();
        categoryUl.empty();

        let idDate = new Date();
        let adding = $('.adding-form__input').val();
        let viewAdding = {
            name: adding,
            id: idDate.getTime(),
            list: []
        };

        /*console.log(idDate.getTime());*/

        storageCategory.push(viewAdding);
        showCategory(storageCategory);
    };

    btnAddCategory.click(addCategory);


    let idCategory = "";
    let showTasks = (element) => {
        if(element) {
            window.location.hash = element.currentTarget.dataset.idCategory;
        }

        idCategory = +window.location.hash.substring(1) || element.currentTarget.dataset.idCategory;

        for (let j = 0; j < storageCategory.length; j++) {
            if (+idCategory === storageCategory[j].id) {

                let liTask = storageCategory[j].list.map(task => {
                    return "<li>" + task + "</li>";
                });

                tasksUl.empty();
                tasksUl.append(liTask);

            }
        }
    };


    let btnAddTask = $('.adding-form__button_task');
    let addTask = (e) => {
        e.preventDefault();
        let addingTask = $('.adding-form__input_addTask').val();

        storageCategory.forEach(function(item) {
            if (+idCategory === item.id) {
                item.list.push(addingTask);
                showTasks();
                console.log(storageCategory);
            }
        });
    };

    btnAddTask.click(addTask);


    $.get("../restore.json", showCategory);

});


