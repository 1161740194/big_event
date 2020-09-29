$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    let str = options.url.includes('/my/')
    if (str) {
        options.headers = {
            Authorization: localStorage['token']
        }
        options.complete = function (xhr) {
            if (xhr.responseJSON.status === 1) location.href = '/login.html'
        }
    }

})