// 1. Aplikacja powinna umożliwić dodawanie, usuwanie oraz edycje listy zadań. Dla każdego z zadań użytkownik może podać tytuł oraz opis.
// 2. Do aplikacji dodaj możliwość edycji istniejących zadań.
// *3. Stwórz możliwość wyszukiwania zadań (według podanej przez użytkownika frazy).
// *4. Wprowadź możliwość ustawiania statusu zadania, status powinien przyjmować wartości z zakresu 'To do', 'In progress', 'Done'.
// *5. Użyj local storage dla zachowania trwałości danych.
window.onload = function () {
    var arr = []
    var confirmBtn = document.getElementById('confirmBtn');
    var listContainer = document.getElementById('list-container');

    confirmBtn.addEventListener('click', addtask);


    function addtask() {
        var titleInp = document.getElementById('titleInp').value
        var informationInp = document.getElementById('informationInp').value
        //tworzenie obiektu dynamicznego 
        var arrTask = {};
        arrTask['title'] = titleInp;
        arrTask['information'] = informationInp;
        //dodanie obiektu do tablicy
        arr.push(arrTask)
        showData(arr)

        // console.log(arrTask)

    }
    function showData(arr) {
        //odswiezanie
        listContainer.innerHTML = '';
        for (var i = 0; i < arr.length; i++) {
            var nextRow = createRow(arr[i], i);
            listContainer.appendChild(nextRow);
        }
    }
    function createRow(object, rowIndex) {
        //tworzymy tr
        var nextTr = document.createElement('tr');
        //nextTr.style.background = 'grey'
        nextTr.style.border = 'solid 1px red'
        //tworzymy komórki
        var cell1 = createCell(object.title);
        cell1.style.border = 'solid 1px red'
        var cell2 = createCell(object.information);
        cell2.style.border = 'solid 1px blue'
        //tworzymy td
        var oneTd = document.createElement('td');

        var twoTd = document.createElement('td');


        //przycisk edycji
        var editBtn = document.createElement('button');
        editBtn.setAttribute('data-index', rowIndex);
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', edit);
        //przycisk usuwania
        var removeBtn = document.createElement('button');
        removeBtn.setAttribute('data-index', rowIndex);
        removeBtn.innerText = 'Usun';
        removeBtn.addEventListener('click', remove);

        //wywołanie
        nextTr.appendChild(cell1);
        nextTr.appendChild(cell2);
        nextTr.appendChild(oneTd);
        nextTr.appendChild(twoTd);
        oneTd.appendChild(editBtn);
        twoTd.appendChild(removeBtn);


        return nextTr
    }
    function createCell(text) {
        var nextTd = document.createElement('td')
        nextTd.innerText = text
        return nextTd

    }
    //pobranie danych z tablicy
    function edit(e) {
        var clickedButton = e.target;
        var indexAttribute = clickedButton.getAttribute('data-index');
        var getObject = arr[indexAttribute];
        titleInp.value = getObject.title;
        informationInp.value = getObject.information;

        confirmBtn.removeEventListener('click', addtask);
        confirmBtn.addEventListener('click', upDate);
    }

    function upDate(e) {
        
        var clickedButton = e.target;
        var indexAttribute = clickedButton.getAttribute('data-index');
        var editedCustomer = { title: titleInp.value, information: informationInp.value };
        arr.splice(indexAttribute, editedCustomer);
        showData(arr);
        
        confirmBtn.removeEventListener('click', upDate);
        confirmBtn.addEventListener('click', addtask);
    };
    // function editcell() {
    //     var editedCustomer = { name: name.value, age: ageInut.value, color: color.value };
    //     arr.splice([indexAttribute], 1, editedCustomer);
    //     showData(arr);
    //     btn.removeEventListener('click', edit);
    //     btn.addEventListener('click', add);
    // };


    function remove(e)//funkcja do remove button
    {
        var clickedButton = e.target;
        var indexAttribute = clickedButton.getAttribute('data-index');
        //console.log(indexAttribute);
        arr.splice(indexAttribute, 1);
        showData(arr);

    }
    var searchBtn = document.getElementById('searchBtn');
    var searchInp = document.getElementById('searchInp');

    searchBtn.addEventListener('click', searchitem);
    //??
    function searchitem() {

        var arrSearch = [];
        for (var i = 0; i < arrSearch.length; i++) {
            if (arr[i].title == searchInp.value || arr[i].information == searchInp.value) {
                //jeśli sie zgadza to dodaj wynik
                arrSearch.push(arr[i]);


            }
            showData(arrSearch);
            return;
        }
    }
}
