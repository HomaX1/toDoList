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

    let showCategory = (data) => {
        let allLi = "";
        storageCategory = data;

        for (let i = 0; i < storageCategory.length; i++) {
            allLi += "<li data-lists='" + storageCategory[i].list + "' data-id-category='" + storageCategory[i].id + "'>" + storageCategory[i].name + "</li>";
        }

        categoryUl.append(allLi);
        categoryUl.find('li').on('click', showTasks).on('click', hashId);
    };


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


    let showTasks = (oneCategory) => {
        const tasksUl = $('.tasks');
        let liArray = oneCategory.currentTarget.dataset.lists.split(',');

        let liHtml = liArray.map(data => {
            return "<li>" + data + "</li>";
        });

        tasksUl.empty();
        tasksUl.append(liHtml);

    };


    let hashId = (category) => {
            window.location.hash = category.currentTarget.dataset.idCategory;
    };

    $.get("../restore.json", showCategory);

});


