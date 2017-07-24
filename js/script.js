$(function () {
    'use strict';
    const ALLCONST = {
        categoryUl: $('.category'),
        tasksUl: $('.tasks'),
        btnAddCategory: $('.adding-form__button_category'),
        btnAddTask: $('.adding-form__button_task'),
        btnDelete: $('.fa-trash-o'),
        btnEdit: $('.fa-pencil'),
        btnSearch: $('.search__icon')
    };
    let globalStorage = [];
    let idCategory = "";


    let showCategories = (data) => {
        globalStorage = data;

        let allLi = globalStorage.map(categoryItem => {
            return "<li data-id-category='" + categoryItem.id + "'>" + categoryItem.name + "<button class='categoryTrash fa fa-trash-o' aria-hidden='true'></button><button class='categoryPencil fa fa-pencil' aria-hidden='true'></button></li>";
        });

        ALLCONST.categoryUl.empty();
        ALLCONST.categoryUl.append(allLi);
        ALLCONST.categoryUl.find('li').on('click', showTasks);
        $('.categoryTrash').click(deleteCategory);
        $('.categoryPencil').click(editCategory);
    };


    let editCategory = (element) => {
        let $parentElement = $(element.target).parent();
        const inputEdit = $('.editInputCategory').clone();
        const dataIdCategoryParent = +$parentElement.attr('data-id-category');

        element.preventDefault();
        $parentElement.replaceWith(inputEdit.css('display', 'block').val($parentElement.text()));

        inputEdit.on('keyup', (event) => {
            if (event.keyCode === 13) {

                globalStorage.forEach(item => {
                   if(item.id === dataIdCategoryParent) {
                       item.name = inputEdit.val();
                   }
                });

                showCategories(globalStorage);
            }
        });
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


        globalStorage.push(viewAdding);
        showCategories(globalStorage);
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
                $('.taskPencil').click(editTask);
            }
        }
    };


    let oneTask = (task) => {
        return "<li>" + task + "<button class='taskTrash fa fa-trash-o' aria-hidden='true'></button><button class='taskPencil fa fa-pencil' aria-hidden='true'></button></li>";
    };


    let editTask = (element) => {
        let $parentElement = $(element.target).parent();
        const inputEdit = $('.editInputCategory').clone();
        const parentTaskText = $(element.target).parent().text();

        element.preventDefault();

        $parentElement.replaceWith(inputEdit.css('display', 'block').val($parentElement.text()));

        inputEdit.on('keyup', (event) => {
            if (event.keyCode === 13) {

                globalStorage.forEach(item => {
                    if(+idCategory === item.id) {

                        item.list = item.list.map(list => {
                            if(list === parentTaskText) {
                                list = inputEdit.val();
                            }
                            return list;
                        });
                    }
                });
                showTasks();
            }
        });
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


