(function() {
    var article2,
        addContentBtn;
    var ready = function (fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };
    var addContent = function() {
        article2.innerHTML += article2.innerHTML;
    };

    var init = function() {
        article2 = document.getElementById('article2');
        addContentBtn = document.getElementById('addContentBtn');
        addContentBtn.addEventListener('click', addContent);
    };

    ready(init);
})();