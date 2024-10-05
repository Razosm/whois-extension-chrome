document.getElementById('whoisBtn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = new URL(tabs[0].url);
        var domain = url.hostname;

        // 'www.' ile başlayan alan adlarını temizle
        if (domain.startsWith('www.')) {
            domain = domain.slice(4); // 'www.' kısmını çıkar
        }

        // sadecewhois.com üzerinde whois sorgusunu başlat
        var whoisUrl = "https://sadecewhois.com/" + domain;
        
        // Yeni sekmede WHOIS sonuçlarını aç
        chrome.tabs.create({ url: whoisUrl });
    });
});