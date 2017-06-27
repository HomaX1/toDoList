$(function () {
    const ALLCONST = {
        categoryUl: $('.category'),
        tasksUl: $('.tasks'),
        btnAddCategory: $('.adding-form__button_category'),
        btnAddTask: $('.adding-form__button_task'),
        btnDelete: $('.fa-trash-o'),
        btnSearch: $('.search__icon')
    };
    let globalStorage = [];
    let idCategory = "";


    let showCategories = (data) => {
        globalStorage = data;

        let allLi = globalStorage.map(categoryItem => {
            return "<li data-id-category='" + categoryItem.id + "'>" + categoryItem.name + "<button class='categoryTrash fa fa-trash-o' aria-hidden='true'></button></li>";
        });

        ALLCONST.categoryUl.append(allLi);
        ALLCONST.categoryUl.find('li').on('click', showTasks);
        $('.categoryTrash').click(deleteCategory);
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
                    return oneTask(task);
                });

                ALLCONST.tasksUl.empty();
                ALLCONST.tasksUl.append(liTask);
                $('.taskTrash').click(deleteTask);
            }
        }
    };


    let oneTask = (task) => {
        return "<li>" + task + "<button class='taskTrash fa fa-trash-o' aria-hidden='true'></button></li>";
    };


    let addTask = (e) => {
        const addingTask = $('.adding-form__input_addTask').val();

        e.preventDefault();

        globalStorage.forEach(item => {
            if (+idCategory === item.id) {
                item.list.push(addingTask);
                showTasks();
            }
        });
    };


    let deleteCategory = (element) => {
        const idLiCategory = element.currentTarget.parentElement.dataset.idCategory;

        element.preventDefault();

        globalStorage = globalStorage.filter(item => {
            return item.id !== +idLiCategory;
        });

        if (+idCategory === +idLiCategory) {
            ALLCONST.tasksUl.empty();
        }

        ALLCONST.categoryUl.empty();
        showCategories(globalStorage);
    };


    let deleteTask = (element) => {
        element.preventDefault();

        const parentTask = element.currentTarget.parentElement.innerText;

        globalStorage.forEach(item => {
            if (+idCategory === item.id) {

                item.list = item.list.filter(list => {
                    return list !== parentTask;
                });
                showTasks();
            }
        });
    };


    let searchTask = (element) => {
        const searchValue = $('.search__input').val();

        element.preventDefault();

        globalStorage.forEach(item => {

            if (+idCategory === item.id) {

                let searchLists = item.list
                    .filter(list => {
                        return list.indexOf(searchValue) !== -1;
                    })
                    .map(itemList => {
                        return oneTask(itemList);
                    });

                ALLCONST.tasksUl.empty();
                ALLCONST.tasksUl.append(searchLists);

            }

        });

    };


    ALLCONST.btnAddCategory.click(addCategory);
    ALLCONST.btnAddTask.click(addTask);
    ALLCONST.btnSearch.click(searchTask);


    $.get("../restore.json", showCategories);

});


