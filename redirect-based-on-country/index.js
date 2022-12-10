//redirect-based-on-country/index.js
//coding@https://github.com/liangyimingcom
function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var host = request.headers.host.value;

    var inputuri = request.uri;
    if (inputuri === '/index.html'  || inputuri === '/' ) {

        var eucountry = 'DE,GB,FR' // 可以添加更多国家代码在这里
        var asiacountry = 'JP,KP,KR,IN' // 区域上的多个国家可以去同一个大洲的站点
        var usacountry = 'US,CA' // 也可以灵活定制某些国家去自己的站点

        // Change the redirect URL to your choice, coding@https://github.com/liangyimingcom
        var eunewurl = `https://${host}/eu/index.html` 
        var asianewurl = `https://${host}/asia/index.html` 
        var usanewurl = `https://${host}/usa/index.html` 
        ////var asianewurl = `https://google.com` // 支持跳转的外部站点

        if (headers['cloudfront-viewer-country']) {
            var countryCode = headers['cloudfront-viewer-country'].value;
            if (eucountry.indexOf(countryCode) > -1) {
                var response = {
                    statusCode: 302,
                    statusDescription: 'Found',
                    headers:
                        { "location": { "value": eunewurl } }
                    }     
                return response;
            }

            if (asiacountry.indexOf(countryCode) > -1) {
                var response = {
                    statusCode: 302,
                    statusDescription: 'Found',
                    headers:
                        { "location": { "value": asianewurl } }
                    }     
                return response;
            }        

            if (usacountry.indexOf(countryCode) > -1) {
                var response = {
                    statusCode: 302,
                    statusDescription: 'Found',
                    headers:
                        { "location": { "value": usanewurl } }
                    }     
                return response;
            }        
        }
    }
    return request;
}