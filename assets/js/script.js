//article button vars
var articleBtn = document.querySelector("#get-articles");
var articlePrev = document.querySelector("#article-prev");
var articleNext = document.querySelector("#article-next");

// report button vars
var reportBtn = document.querySelector("#get-reports");
var reportPrev = document.querySelector("#report-prev");
var reportNext = document.querySelector("#report-next");

// blog button vars
var blogBtn = document.querySelector("#get-blogs");
var blogPrev = document.querySelector("#blog-prev");
var blogNext = document.querySelector("#blog-next");

// important div vars
var articleDiv = document.getElementById("articles");
var reportDiv = document.getElementById("reports");
var blogDiv = document.getElementById("blogs");
var footer = document.getElementById("footer");

// request info vars
var type;
var resultLimit = 10;
var pageReq = 0;
var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-news");
var searchThis;
var userSearched = false;
var requestSearch="";
var previousSearches = [];
var requestUrl;

// Fills array with local storage or gives empty array.
var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];

for (i = 0; i < 5; i++) {
    $('<option id="searchList" />').text(savedSearches[i]).appendTo('#searches');
}

// list types
var articleList = document.querySelector("#list-articles");
var reportList = document.querySelector("#list-reports");
var blogList = document.querySelector("#list-blogs");

// get current media queries
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var mediaQuery980 = 980;
var mediaQuery575 = 575;

console.log("Current Window width: "+width+"| mediaquery980 thing: "+mediaQuery980);

var requestSpaceInfo = function(infoType){
    var currentTerm = localStorage.getItem("currentTerm");
    console.log(infoType);
    if(userSearched){
        console.log(requestUrl);
        requestSearch = "title_contains="+currentTerm+"&";
    }
    else{
        requestUrl = 'https://api.spaceflightnewsapi.net/v3/'+type+'?'+requestSearch+'_start='+pageReq+'&_limit='+resultLimit;
    }
    // disable prev button if page req is 0
    if(pageReq === 0){
        articlePrev.disabled=true;
        reportPrev.disabled=true;
        blogPrev.disabled=true;
    }
    else{
        articlePrev.disabled=false;
        reportPrev.disabled=false;
        blogPrev.disabled=false;
    }
    
    // fetch spaceflight news
    fetch(requestUrl)
    .then((res) => res.json())
        .then(function(data){
            // if infoType equals "articles"...
            if(infoType === "articles"){
                for(var i = 0; i < data.length; i++){
                    // stringify data
                    var object = JSON.stringify(data[i]);
                    object = JSON.parse(object)
                    console.log(object);
                    // create article card
                    var articleCard = document.createElement("div");
                    articleCard.className="article-card card";
                    articleCard.setAttribute("url", data[i].url);
                    articleCard.id="article-"+object.id;

                    var articleImgDiv = document.createElement("div");
                    articleImgDiv.className="art-div";
                    articleCard.appendChild(articleImgDiv);

                    // create article image and attach it to article card
                    var articleImg = document.createElement("img");
                    articleImg.className="article-img";
                    articleImg.src = object.imageUrl;
                    articleImgDiv.appendChild(articleImg);
                    
                    // create article info div and attach to article card
                    var articleInfo = document.createElement("div");
                    articleInfo.className="article-info";
                    articleCard.appendChild(articleInfo);

                    if(width <= mediaQuery980){
                        med980(object, articleCard, articleInfo);
                    }
                    
                    var articleUrl = document.createElement("a");
                    articleUrl.classList = "linker";
                    articleUrl.id = "art-link-"+object.id;
                    articleUrl.target = "_blank";
                    var artTitle = object.title;
                    if(artTitle.length > 50){
                        artTitle = artTitle.substring(49, 0)+"...";
                    }
                    articleUrl.textContent = artTitle;
                    articleUrl.href = object.url;
                    console.log(articleUrl.innerText);
                    console.log(articleUrl);

                    articleInfo.appendChild(articleUrl);
                    
                    // create article summary and attach to article info div
                    var articleSum = document.createElement("p");
                    articleSum.className="article-summary";
                    var summARRY = object.summary;
                    if(width <= mediaQuery575){
                        if(summARRY.length > 20){
                            summARRY = summARRY.substring(19, 0) + "...";
                        }
                    }
                    else{
                        if(summARRY.length > 120){
                            summARRY = summARRY.substring(119, 0) + "...";
                        }
                    }
                    articleSum.textContent=summARRY;
                    articleInfo.appendChild(articleSum);

                    // create published-info div
                    var pubDiv = document.createElement("div");
                    pubDiv.className = "published-info";
                    
                    // create article site and attach to article div info
                    var articleSite = document.createElement("h4");
                    articleSite.className="article-news-site";
                    articleSite.textContent="By: "+object.newsSite;
                    pubDiv.appendChild(articleSite);

                    // published on
                    var pubOn = document.createElement("h4");
                    pubOn.className ="published-on";
                    var date = object.publishedAt;
                    date = date.split("T")[0];
                    pubOn.textContent="Published On: "+date;
                    pubDiv.appendChild(pubOn);
                    
                    // pub div attach to article card
                    articleInfo.appendChild(pubDiv);

                    // attach article card to article list
                    articleList.appendChild(articleCard);
                }
            }
            if(infoType === "reports"){
                for(var i = 0; i < data.length; i++){// stringify data
                    var object = JSON.stringify(data[i]);
                    object = JSON.parse(object)
                    console.log(object);
                    // create report card
                    var reportCard = document.createElement("div");
                    reportCard.className="report-card card";
                    reportCard.setAttribute("url", data[i].url);
                    reportCard.id="report-"+object.id;

                    var reportImgDiv = document.createElement("div");
                    reportImgDiv.className="rep-div";
                    reportCard.appendChild(reportImgDiv);

                    // create report image and attach it to report card
                    var reportImg = document.createElement("img");
                    reportImg.className="report-img";
                    reportImg.src = object.imageUrl;
                    reportImgDiv.appendChild(reportImg);
                    
                    // create report info div and attach to report card
                    var reportInfo = document.createElement("div");
                    reportInfo.className="report-info";
                    reportCard.appendChild(reportInfo);

                    if(width <= mediaQuery980){
                        med980(object, reportCard, reportInfo);
                    }
                    
                    var reportUrl = document.createElement("a");
                    reportUrl.classList = "linker";
                    reportUrl.id = "rep-link-"+object.id;
                    reportUrl.target = "_blank";
                    var repTitle = object.title;
                    if(repTitle.length > 50){
                        repTitle = repTitle.substring(49, 0)+"...";
                    }
                    reportUrl.textContent = repTitle;
                    reportUrl.href = object.url;
                    console.log(reportUrl.innerText);
                    console.log(reportUrl);

                    reportInfo.appendChild(reportUrl);
                    
                    // create report summary and attach to report info div
                    var reportSum = document.createElement("p");
                    reportSum.className="report-summary";
                    var summARRY = object.summary;
                    if(width <= mediaQuery575){
                        if(summARRY.length > 20){
                            summARRY = summARRY.substring(19, 0) + "...";
                        }
                    }
                    else{
                        if(summARRY.length > 120){
                            summARRY = summARRY.substring(119, 0) + "...";
                        }
                    }
                    reportSum.textContent=summARRY;
                    reportInfo.appendChild(reportSum);

                    // create published-info div
                    var pubDiv = document.createElement("div");
                    pubDiv.className = "published-info";
                    
                    // create report site and attach to report div info
                    var reportSite = document.createElement("h4");
                    reportSite.className="report-news-site";
                    reportSite.textContent="By: "+object.newsSite;
                    pubDiv.appendChild(reportSite);

                    // published on
                    var pubOn = document.createElement("h4");
                    pubOn.className ="published-on";
                    var date = object.publishedAt;
                    date = date.split("T")[0];
                    pubOn.textContent="Published On: "+date;
                    pubDiv.appendChild(pubOn);
                    
                    // pub div attach to report card
                    reportInfo.appendChild(pubDiv);

                    // attach report card to report list
                    reportList.appendChild(reportCard);
                }
            }
            if(infoType === "blogs"){
                for(var i = 0; i < data.length; i++){// stringify data
                    var object = JSON.stringify(data[i]);
                    object = JSON.parse(object)
                    console.log(object);
                    // create blog card
                    var blogCard = document.createElement("div");
                    blogCard.className="blog-card card";
                    blogCard.setAttribute("url", data[i].url);
                    blogCard.id="blog-"+object.id;

                    var blogImgDiv = document.createElement("div");
                    blogImgDiv.className="blog-div";
                    blogCard.appendChild(blogImgDiv);

                    // create blog image and attach it to blog card
                    var blogImg = document.createElement("img");
                    blogImg.className="blog-img";
                    blogImg.src = object.imageUrl;
                    blogImgDiv.appendChild(blogImg);
                    
                    // create blog info div and attach to blog card
                    var blogInfo = document.createElement("div");
                    blogInfo.className="blog-info";
                    blogCard.appendChild(blogInfo);

                    if(width <= mediaQuery980){
                        med980(object, blogCard, blogInfo);
                    }
                    
                    var blogUrl = document.createElement("a");
                    blogUrl.classList = "linker";
                    blogUrl.id = "blog-link-"+object.id;
                    blogUrl.target = "_blank";
                    var blogTitle = object.title;
                    if(blogTitle.length > 50){
                        blogTitle = blogTitle.substring(49, 0)+"...";
                    }
                    blogUrl.textContent = blogTitle;
                    blogUrl.href = object.url;
                    console.log(blogUrl.innerText);
                    console.log(blogUrl);

                    blogInfo.appendChild(blogUrl);
                    
                    // create blog summary and attach to blog info div
                    var blogSum = document.createElement("p");
                    blogSum.className="blog-summary";
                    var summARRY = object.summary;
                    if(width <= mediaQuery575){
                        if(summARRY.length > 20){
                            summARRY = summARRY.substring(19, 0) + "...";
                        }
                    }
                    else{
                        if(summARRY.length > 120){
                            summARRY = summARRY.substring(119, 0) + "...";
                        }
                    }
                    blogSum.textContent=summARRY;
                    blogInfo.appendChild(blogSum);

                    // create published-info div
                    var pubDiv = document.createElement("div");
                    pubDiv.className = "published-info";
                    
                    // create blog site and attach to blog div info
                    var blogSite = document.createElement("h4");
                    blogSite.className="blog-news-site";
                    blogSite.textContent="By: "+object.newsSite;
                    pubDiv.appendChild(blogSite);

                    // published on
                    var pubOn = document.createElement("h4");
                    pubOn.className ="published-on";
                    var date = object.publishedAt;
                    date = date.split("T")[0];
                    pubOn.textContent="Published On: "+date;
                    pubDiv.appendChild(pubOn);
                    
                    // pub div attach to blog card
                    blogInfo.appendChild(pubDiv);

                    // attach blog card to blog list
                    blogList.appendChild(blogCard);
                }
            }
        });
};

var requestDailySpaceImg = function(){
    // request urls
    var imgRequestUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    var mainContainer = document.getElementById("mainContainer");
    fetch(imgRequestUrl)
        .then(function(res){
            if(!res.ok){
                throw Error(res.statusText + " - "+ res.url);
            }
            return res.json();
        })
        .then(function(data){
            // var object = JSON.stringify(data);
            mainContainer.style.backgroundImage = "url("+data.url+")";
        })
        .catch(function(err){
            console.log(err);
            mainContainer.style.backgroundImage = "url('./assets/images/earth.jpeg')";
        });
};

//// PREVIOUS BUTTONS
// function to get previous article page
var articlePrevPage = function(){
    pageReq = pageReq - resultLimit;
    while(articleList.firstChild){
        articleList.removeChild(articleList.firstChild);
    }
    requestSpaceInfo(type);
}
// function to get previous report page
var reportPrevPage = function(){
    pageReq = pageReq - resultLimit;
    while(reportList.firstChild){
        reportList.removeChild(reportList.firstChild);
    }
    requestSpaceInfo(type);
}
// function to get previous blog page
var blogPrevPage = function(){
    pageReq = pageReq - resultLimit;
    while(blogList.firstChild){
        blogList.removeChild(blogList.firstChild);
    }
    requestSpaceInfo(type);
}

//// NEXT BUTTONS
// function to get next article page
var articleNextPage = function(){
    pageReq = pageReq + resultLimit;
    while(articleList.firstChild){
        articleList.removeChild(articleList.firstChild);
    }
    requestSpaceInfo(type);
};
// function to get next report page
var reportNextPage = function(){
    pageReq = pageReq + resultLimit;
    while(reportList.firstChild){
        reportList.removeChild(reportList.firstChild);
    }
    requestSpaceInfo(type);
};
// function to get next blog page
var blogNextPage = function(){
    pageReq = pageReq + resultLimit;
    while(blogList.firstChild){
        blogList.removeChild(blogList.firstChild);
    }
    requestSpaceInfo(type);
};

//// SHOW SECTIONS
// function to show articles
var showArticles = function(){
    userSearched = false;
    type = "articles";
    changeHeaderStyle(type);
    footer.style.display="flex";
    articleDiv.style.display="flex";
    reportDiv.style.display="none";
    blogDiv.style.display="none";
    // if reportList has children
    if(reportList.hasChildNodes()){
        while(reportList.firstChild){
            reportList.removeChild(reportList.firstChild);
        }
    }
    // if blogList has children
    if(blogList.hasChildNodes()){
        while(blogList.firstChild){
            blogList.removeChild(blogList.firstChild);
        }
    }
    requestSpaceInfo(type);
};
//function to show reports
var showReports = function(){
    userSearched = false;
    type = "reports";
    changeHeaderStyle(type);
    footer.style.display="flex";
    reportDiv.style.display="flex";
    blogDiv.style.display="none";
    articleDiv.style.display="none";
    // if articleList has children
    if(articleList.hasChildNodes()){
        while(articleList.firstChild){
            articleList.removeChild(articleList.firstChild);
        }
    }
    // if blogList has children
    if(blogList.hasChildNodes()){
        while(blogList.firstChild){
            blogList.removeChild(blogList.firstChild);
        }
    }
    requestSpaceInfo(type);
};
//function to show blogs
var showBlogs = function(){
    userSearched = false;
    type = "blogs";
    changeHeaderStyle(type);
    footer.style.display="flex";
    blogDiv.style.display="flex";
    articleDiv.style.display="none";
    reportDiv.style.display="none";
    // if articleList has children
    if(articleList.hasChildNodes()){
        while(articleList.firstChild){
            articleList.removeChild(articleList.firstChild);
        }
    }
    // if reportList has children
    if(reportList.hasChildNodes()){
        while(reportList.firstChild){
            reportList.removeChild(reportList.firstChild);
        }
    }
    requestSpaceInfo(type);
};

// change header style function
var changeHeaderStyle = function(infoType){
    var mainContainer = document.getElementById("mainContainer");
    var menuDiv = document.getElementById("menu");
    var searchDiv = document.getElementById("search-div");
    var trovTitle = document.getElementById("trov-title");
    var artBtn = document.getElementById("get-articles");
    var repBtn = document.getElementById("get-reports");
    var blgBtn = document.getElementById("get-blogs");
    var outP = document.getElementById("outline-p");
    var menuBottom = document.getElementById("menu-bottom");
    var searchLbl = document.getElementById("search-label");

    mainContainer.style.transitionProperty = "height";
    mainContainer.style.transitionDuration = "1s";
    mainContainer.style.height = "300px";
    menuDiv.style.flexDirection = "row";
    artBtn.style.marginTop="1px";
    repBtn.style.marginTop="1px";
    blgBtn.style.marginTop="1px";
    outP.style.margin="5px";
    trovTitle.style.margin = "10px 0";
    trovTitle.style.fontSize = "32px";
    menuBottom.style.marginLeft = "4px";
    searchDiv.style.display="flex";
    // searchLbl.textContent="Search "+infoType+": ";
}
var searchFor = function(event){
    event.preventDefault();
    searchThis = searchInput.value;
    searchThis = searchThis.replace(" ","_");
    console.log("SEARCH THIS: "+ searchThis);
    if (searchThis === '') {
        return;
    }
    // indexOf checks to see if it's in the array
    if (savedSearches.indexOf(searchThis) === -1) {
        // unshift determines reverse order for the array
        savedSearches.unshift(searchThis);
        localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
        localStorage.setItem("currentTerm", searchThis);
        for (i = 0; i < 5; i++) {
            $('<option id="searchList" />').text(savedSearches[i]).appendTo('#searches');
        }
    }
    userSearched = true;
    requestSearch = "title_contains="+searchThis+"&";
    requestUrl = 'https://api.spaceflightnewsapi.net/v3/'+type+'?'+requestSearch+'_start='+pageReq+'&_limit='+resultLimit;
    // fetch(requestUrl).then((res) => res.json()).then(function(data){
    //     console.log(data);
    // });
    removeCards();
    saveSearch(searchThis);
};
var saveSearch = function(searchThis){
    if(previousSearches.length < 5){
        previousSearches.push(searchThis);
        previousSearches = previousSearches.reverse()
        console.log(savedSearches);
    }
    else{
        savedSearches.pop();

    }

}

var removeCards = function(){
    if(type === "articles"){
        while(articleList.firstChild){
            articleList.removeChild(articleList.firstChild);
        }
    }
    else if(type === "reports"){
        while(reportList.firstChild){
            reportList.removeChild(reportList.firstChild);
        }
    }
    else if(type === "blogs"){
        while(blogList.firstChild){
            blogList.removeChild(blogList.firstChild);
        }
    }
    requestSpaceInfo(type);
}

// article button event listeners
var checkTime = function(){
    requestRandomSpaceImg();
};

// request daily space img on load
requestDailySpaceImg();

var med980 = function(object, card, cardInfo){
    card.style.backgroundImage = "url("+object.imageUrl+")";
    card.removeChild(card.firstChild);
    cardInfo.style.width = "100%";
    cardInfo.style.backgroundColor = "rgba(255,255,255, .7)";
}
// interval for checking to see 
setInterval(requestDailySpaceImg, (1000 * 60) * 120);

articleBtn.addEventListener("click", showArticles);
articlePrev.addEventListener("click", articlePrevPage);
articleNext.addEventListener("click", articleNextPage);

// report button event listeenrs
reportBtn.addEventListener("click", showReports);
reportPrev.addEventListener("click", reportPrevPage);
reportNext.addEventListener("click", reportNextPage);

// blog button event listeners
blogBtn.addEventListener("click", showBlogs);
blogPrev.addEventListener("click", blogPrevPage);
blogNext.addEventListener("click", blogNextPage);


// other event listners
searchBtn.addEventListener("click", searchFor);
// searchInput.addEventListener("input");