<form id="comment-form">
    <button id="cancel-new-comment" type="button">X</button>

    <label for="new-comment-author">Name</label>
    <input type="text" id="new-comment-author" name="author"/>

    <label class="required" for="new-comment-content">Message</label>
    <textarea id="new-comment-content" name="content"></textarea>

    <label for="new-comment-feeling-list">Feeling</label>
    <ul class="unstyled-list horizontal-list feeling-list" id="new-comment-feeling-list">
        <li class="far"><button type="button" value="happy">😊</button></li>
        <li class="close"><button type="button" value="excited">😃</button></li>
        <li class="selected"><button type="button" value="blank">😶</button></li>
        <li class="close"><button type="button" value="angry">😡</button></li>
        <li class="far"><button type="button" value="sad">😢</button></li>
    </ul>

    <!-- Ghost input, value is changed in main.js -->
    <input id="new-comment-feeling" name="feeling" type="hidden" value="blank" />

    <!-- Ghost input, value is changed in main.js -->
    <input id="new-comment-parent-id" name="parentID" type="hidden" value="null" />

    <p style="color: #ff6666;text-align: center;font-size: 1.4rem;" id="new-comment-form-response"></p>
    <!-- Form Submit -->
    <input id="submit-comment-button" class="black-button accent-border-bottom-blank" type="submit" value="Send Comment.">
</form>