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

  let showCategory = (data) => {
    const categoryUl = $('.category');
    let allLi = "";

    for (let i = 0; i < data.length; i++) {
      allLi += "<li data-lists='" + data[i].list + "'>" + data[i].name + "</li>";
    }

    categoryUl.append(allLi);
    categoryUl.find('li').on('click', showTasks);
  };

  let showTasks = (oneCategory) => {
    const tasksUl = $('.tasks');
    let liArray = oneCategory.currentTarget.dataset.lists.split(',');

    let liHtml = liArray.map(data => {
      return "<li>" + data + "</li>";
    });

    tasksUl.empty();
    tasksUl.append(liHtml);
  };


  $.get("../restore.json",showCategory);

});




