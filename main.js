const status_text = document.getElementById('status');
function showDropdown(inputID) {
  var dropdown = document.getElementById(inputID);
  if (dropdown) {
    dropdown.style.display = "block";
  }
}

function hideDropdown(inputID) {
  var dropdown = document.getElementById(inputID);
  if (dropdown) {
    dropdown.style.display = "none";
  }
}


function selectRole(value, label, ID, inputID) {
  var input = document.getElementById(ID);
  input.value = label;
  hideDropdown(inputID);

}

let counter = 2;
let storageValue = 4;

let HashMap = {};

for (let i = 1; i <= storageValue;i++){
  HashMap[i] = 1;
}


function showPlacesOnload() {
  var keys = Object.keys(HashMap);
  
  for (let i = 0; i < keys.length; i++) {
    let current = HashMap[keys[i]];
    const newPlace = document.createElement('div');
    newPlace.id = `place${i}`;
  }
}

showPlacesOnload();

function addNumber() {
  const newPlace = document.createElement('div');
  newPlace.classList.add('places');
  newPlace.id = `place_${counter}`;

  newPlace.innerHTML = `
      <p>Товар ${counter}</p>
      <label>Код артикула</label>
      <input class="code" type="text" id="code${counter}" name="code" placeholder="Введите артикул">
      <label>Наименование товара</label>
      <input class="title" type="text" id="title${counter}" name="title" value="ТНП" placeholder="Введите товар">
      <label>Стоимость ед. товара в ₽</label>
      <input type="number" id="place_cost${counter}" name="place_cost" placeholder="Введите стоимость">

      <div class="weight_input">
          <div class="left_input" id="left_input${counter}">
              <label>Вес ед. товара (кг)</label>
              <input class="weight" type="number" id="weight${counter}" name="weight" placeholder="Введите кг.">
          </div>
          <div>
              <label>Кол-во ед.</label>
              <input class="count" type="number" id="count${counter}" name="count" placeholder="Введите шт.">
          </div>  
      </div>

      <label>Оплата получателя за ед. товара в т.ч. НДС ₽</label>
      <input type="number" class="cost" id="cost${counter}" name="cost_with_nds" value="0" placeholder="Введите стоимость">
      <div class="nds-flex">
          <div class="left_input_place" id="left_input_place${counter}">
              <label>Ставка НДС, %</label>
              <input type="text" class="place_combobox_value" id="place_combobox_value${counter}" onclick="showDropdown('place_ndsList${counter}')" placeholder="НДС" readonly>
              <ul id="place_ndsList${counter}" class="dropdown-list">
                  <li value="without" data-id="without" class="option" onclick="selectRole('without', 'Нет НДС','place_combobox_value${counter}', 'place_ndsList${counter}')">Нет НДС</li>
                  <li value="zero" data-id="zero" class="option" onclick="selectRole('zero', '0%','place_combobox_value${counter}', 'place_ndsList${counter}')">0%</li>
                  <li value="ten" data-id="ten" class="option" onclick="selectRole('ten', '10%','place_combobox_value${counter}', 'place_ndsList${counter}')">10%</li>
                  <li value="twenty" data-id="twenty" class="option" onclick="selectRole('twenty', '20%','place_combobox_value${counter}', 'place_ndsList${counter}')">20%</li>
              </ul>
          </div>

          <div>
              <label>Сумма НДС, ₽</label>
              <input type="text" class="nds_cost" id="nds_cost${counter}" name="nds_cost" placeholder="Подсчет">
          </div>
      </div>
      <button class="created" id="for_delete" type="button" onclick="removePlace('${newPlace.id}')">Удалить</button>
  `;

  counter++;
  document.querySelector('.places-container').appendChild(newPlace);
}

function removePlace(placeId) {
  const placeToRemove = document.getElementById(placeId);
  placeToRemove.remove();

  const places = document.getElementsByClassName('places');
  for (let i = 0; i < places.length; i++) {
    const currentPlace = places[i];
    const newPlaceCounter = i + 1;

    currentPlace.id = `place_${newPlaceCounter}`;
    currentPlace.querySelector('p').innerText = `Товар ${newPlaceCounter}`;

    currentPlace.querySelectorAll('[id^="code"], [id^="title"], [id^="place_cost"], [id^="left_input"], [id^="weight"], [id^="count"], [id^="cost"], [id^="left_input_place"], [id^="place_combobox_value"], [id^="place_ndsList"], [id^="place_combobox_value"], [id^="nds_cost"]').forEach(element => {
      const currentElementId = element.id;
      element.id = currentElementId.replace(/\d+$/, newPlaceCounter);
    });

    const deleteButton = currentPlace.querySelector('button');
    if (deleteButton) {
      deleteButton.setAttribute('onclick', `removePlace('place_${newPlaceCounter}')`);
    }
  }

  counter--;
}









// window.TelegramWebviewProxy.postEvent('web_app_setup_closing_behavior', JSON.stringify({ need_confirmation: true }));

