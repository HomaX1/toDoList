$(function () {
    const ALLCONST = {
        categoryUl: $('.category'),
        tasksUl: $('.tasks'),
        btnAddCategory: $('.adding-form__button_category'),
        btnAddTask: $('.adding-form__button_task'),
        btnDelete: $('.fa-trash-o')
    };
    let globalStorage = [];
    let idCategory = "";


    let showCategories = (data) => {
        globalStorage = data;

        let allLi = globalStorage.map(categoryItem => {
            return "<li data-id-category='" + categoryItem.id + "'>" + categoryItem.name + "<button class='fa fa-trash-o' aria-hidden='true'></button>" + "</li>";
        });

        ALLCONST.categoryUl.append(allLi);
        ALLCONST.categoryUl.find('li').on('click', showTasks);
        $('.fa-trash-o').click(deleteCategoryOrTask);
    };


    let addCategory = (e) => {
        const idDate = new Date();
        const adding = $('.adding-form__input').val();
        const viewAdding = {
            name: adding,
            id: idDate.getTime(),
            list: []
        };

        e.preventDefault();
        ALLCONST.categoryUl.empty();

        globalStorage.push(viewAdding);
        showCategories(globalStorage);
    };


    let showTasks = (element) => {
        if (element) {
            window.location.hash = element.currentTarget.dataset.idCategory;
        }

        idCategory = +window.location.hash.substring(1) || element.currentTarget.dataset.idCategory;

        for (let j = 0; j < globalStorage.length; j++) {
            if (+idCategory === globalStorage[j].id) {

                let liTask = globalStorage[j].list.map(task => {
                    return "<li>" + task + "<button class='fa fa-trash-o' aria-hidden='true'></button>" + "</li>";
                });

                ALLCONST.tasksUl.empty();
                ALLCONST.tasksUl.append(liTask);
                ALLCONST.btnDelete.click(deleteCategoryOrTask);

            }
        }
    };


    let addTask = (e) => {
        const addingTask = $('.adding-form__input_addTask').val();

        e.preventDefault();

        globalStorage.forEach(function (item) {
            if (+idCategory === item.id) {
                item.list.push(addingTask);
                showTasks();
            }
        });
    };


    let deleteCategoryOrTask = (e) => {
        e.preventDefault();
        console.log("hklhl");
    };


    ALLCONST.btnAddCategory.click(addCategory);
    ALLCONST.btnAddTask.click(addTask);


    $.get("../restore.json", showCategories);

});


