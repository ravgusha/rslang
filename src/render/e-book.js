const containerHtmlData = `<div class="ebook">
      <div class="ebook__container">
        <div class="ebook__header">
          <div class="ebook__pag tui-pagination" id="tui-pagination-container"></div>
          <div class="ebook__menu">
            <button class="ebook__audiocall">Audiocall</button>
            <button class="ebook__sprint">Sprint</button>
            <button class="ebook__settings">Settings</button>
          </div>
        </div>
        <div class="ebook__main">
          <div class="tabs__container" id="tabs" role="tablist">
            <div class="tab active" data-group="0" role="tab">Chapter 1</div>
            <div class="tab" data-group="1" role="tab">Chapter 2</div>
            <div class="tab" data-group="2" role="tab">Chapter 3</div>
            <div class="tab" data-group="3" role="tab">Chapter 4</div>
            <div class="tab" data-group="4" role="tab">Chapter 5</div>
            <div class="tab" data-group="5" role="tab">Chapter 6</div>
          </div>
          <div class="content__container">
            <div class="content">
            </div>
            <div class="content hidden"></div>
            <div class="content hidden"></div>
            <div class="content hidden"></div>
            <div class="content hidden"></div>
            <div class="content hidden"></div>
          </div>
        </div>
      </div>
    </div>`;

function renderEbookScreen() {
  document.body.innerHTML = containerHtmlData;
}
export default renderEbookScreen;
