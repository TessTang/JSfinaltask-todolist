let btn_add = document.querySelector('.btn_add');
let input = document.querySelector('.input>input');
let list = document.querySelector('.list');
let listContent = [];
let did;
let todo;


//設置重置待完成已完成列
// 1.did篩選已完成
// 2.todo篩選未完成

let resetList = function () {
    did = listContent.filter(val => val.checked === true);
    todo = listContent.filter(val => val.checked === false);
};

// 設定按下每個tab渲染對應的陣列
let tab = document.querySelectorAll('.tab>li');
tab.forEach(item => {
    item.addEventListener('click', () => {
        tab.forEach(tabItem => tabItem.classList.remove('active'));
        item.classList.toggle('active');
        checkTab();
    });
});

//設置之後每個改變在對應tab的動作
function checkTab() {
    resetList();
    tab.forEach(item => {
        if (item.classList.contains('active')) {
            if (item.textContent == "全部") {
                add(listContent);
                count();
            } else if (item.textContent == "待完成") {
                add(todo)
                count();
            } else {
                add(did);
                count();
            }
        };
    })
};

//設定每個項目的DATA-NUM代出每個項目的id
let thingId = 0;

//設置加入list的function，可以代入不同tab的陣列
// 1.要確認每個項目的id，方便之後查找刪除對應項目 =>thingId
// 2.要直接確認是否有checked屬性，以便在切換tab時可以直接顯示對應屬性 =>checkc

function add(x) {
    let doList = '';
    x.forEach(function (val) {
        let checkc = val.checked ? 'checked' : "";
        let thingId = val.id;
        doList += `<li data-num="${thingId}"><label class="checkbox" for=""><input type="checkbox" ${checkc}/>
        <span>${val.content}</span>
        </label>
        <a href="#" class="delete"></a>
      </li>`;
    });
    list.innerHTML = doList;
};

//加入項目，若無內容須輸入，有內容加入listContent陣列中
//1.確認有無輸入內容，只輸入空白也不行
//2.將對應資料push進listContent陣列，對應id屬性，跟checked屬性預設以便監聽是否已完成
//3.確認對應tab

btn_add.addEventListener('click', function () {
    if (input.value.trim() == '') {
        alert('請輸入待辦事項')
        return
    }
    listContent.push({ 'id': thingId, 'content': input.value, 'checked': false });
    input.value = '';
    thingId++;
    checkTab();
});


//設定按下列表項目後的動作
// 1.若按下的是刪除，刪除對應的項次(用data-num的id去找在listContent中對應的)
// 2.若按下的不是刪除，對應項次的checked改變，確認在哪個TAB後列表
list.addEventListener('click', function (e) {
    let i = e.target.closest("li").getAttribute("data-num");
    let listIndex = listContent.findIndex(val => val.id == i);

    if (e.target.nodeName == 'A') {
        listContent.splice(listIndex, 1);
    } else {
        listContent[listIndex].checked = !listContent[listIndex].checked;
    }
    checkTab();
});

// //設定下方待完成加總
let list_footer = document.querySelector('.list_footer>p');
function count() {
    resetList();
    list_footer.textContent = `${todo.length} 個待完成項目`
}
count();

//清除已完成項目
let deleteDid = document.querySelector('.list_footer>a');
deleteDid.addEventListener('click', function () {
    listContent = listContent.filter(val => val.checked == false);
            checkTab();
})
