function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$('#ajax-form').on('submit', function(e) {
    e.preventDefault();
    let form_elem = "#ajax-form"
    //let data = new FormData($(form_elem).get(0))
    let url     = $(form_elem).prop("action");
    let method  = $(form_elem).prop("method");


    $.ajax({
        'url': url,
        'type': 'POST',
        'data': {
            'number1': $('#number1').val(),
        },
        'dataType': 'json'
    })
    .done(function(response){
        $('#result').html(response.content)
    })
    .fail(function() {
        $('#result').html("<p>failed ! </p>")
    });
});
  //.accordion_oneの中の.accordion_headerがクリックされたら
$('.acc_btn').click(function(){
//クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
$(this).next().slideToggle();
$(this).toggleClass("open");
});