document.getElementById('whoisBtn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = new URL(tabs[0].url);
        var domain = url.hostname;

        // Eğer geçerli bir domain yoksa ana sayfaya yönlendir
        if (!domain || domain === 'newtab' || domain === 'chrome') {
            chrome.tabs.create({ url: "https://sadecewhois.com" });
            return;
        }

        // 'www.' ile başlayan alan adlarını temizle
        if (domain.startsWith('www.')) {
            domain = domain.slice(4); // 'www.' kısmını çıkar
        }

        // İki parçalı üst seviye alan adlarını korumak için tescilli ccTLD'ler listesi
        var ccTLDs = ['com.tr', 'co.uk', 'org.br', 'gov.uk', 'edu.au'];

        // Ana domaini almak için domain parçalarını ayır
        var domainParts = domain.split('.');

        // Eğer iki parçalı bir ccTLD varsa onu algıla
        var isCCTLD = ccTLDs.some(function (tld) {
            return domain.endsWith(tld);
        });

        if (isCCTLD && domainParts.length > 2) {
            // Eğer iki parçalı bir ccTLD varsa, son üç parçayı birleştir
            domain = domainParts.slice(-3).join('.');
        } else if (domainParts.length > 2) {
            // Normal subdomain'leri almak için son iki parçayı birleştir
            domain = domainParts.slice(-2).join('.');
        }

        // sadecewhois.com üzerinde whois sorgusunu başlat
        var whoisUrl = "https://sadecewhois.com/" + domain;
        
        // Yeni sekmede WHOIS sonuçlarını aç
        chrome.tabs.create({ url: whoisUrl });
    });
});
