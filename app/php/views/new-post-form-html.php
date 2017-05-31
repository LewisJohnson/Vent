<form id="new-post-form">
    <button id="cancel-new-post" type="button">X</button>

    <label class="required" for="new-post-title" >Title</label>
    <input type="text" id="new-post-title" name="title"/>

    <label for="new-post-author">Name</label>
    <input type="text" id="new-post-author" name="author"/>

    <label class="required" for="new-post-content">Message</label>
    <textarea id="new-post-content" name="content"></textarea>

    <label for="new-post-feeling-list">Feeling</label>
    <ul class="unstyled-list horizontal-list feeling-list" id="new-post-feeling-list">
        <li class="far"><button type="button" value="happy">😊</button></li>
        <li class="close"><button type="button" value="excited">😃</button></li>
        <li class="selected"><button type="button" value="blank">😶</button></li>
        <li class="close"><button type="button" value="angry">😡</button></li>
        <li class="far"><button type="button" value="sad">😢</button></li>
    </ul>

    <!-- Ghost input, value is changed in main.js -->
    <input id="new-post-feeling" name="feeling" type="hidden" value="blank" />

    <label for="new-post-allow-comments" style="display: inline-block; margin-bottom: 25px;padding-top: 7px;">Allow comments</label>
    <label class="switch" style="float: right;">
        <input id="new-post-allow-comments" class="feeling-filter" type="checkbox" checked>
        <div class="slider round"></div>
    </label>

    <p style="color: #ff6666;text-align: center;font-size: 1.4rem;" id="new-post-form-response"></p>
    <!-- Form Submit -->
    <input id="submit-post-button" class="black-button accent-border-bottom-blank" type="submit" value="Send Vent.">
</form>